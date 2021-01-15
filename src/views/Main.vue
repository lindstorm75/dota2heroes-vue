<template>
  <div className="center-container">
      <div className="heading-container">
        <h1 className="heading">Dota 2 Heroes</h1>
      </div>
      <h2 v-if="loading">Loading...</h2>
      <div v-else className="container">
        <h2 className="attr" :style="{color: '#EF4444'}">strength</h2>
        <div className="hero-container">
          <HeroCard
            v-for="hero in strs"
            :key="hero.id"
            :attr="hero.primary_attr"
            :localized_name="hero.localized_name"
            :name="hero.name.split('_dota_hero_')[1]"
          />
        </div>
      </div>
      <div className="container">
        <h2 className="attr" :style="{color: '#10B981'}">aiglity</h2>
        <div className="hero-container">
          <HeroCard
            v-for="hero in agis"
            :key="hero.id"
            :attr="hero.primary_attr"
            :localized_name="hero.localized_name"
            :name="hero.name.split('_dota_hero_')[1]"
          />
        </div>
      </div>
      <div className="container">
        <h2 className="attr" :style="{color: '#3B82F6'}">inteligence</h2>
        <div className="hero-container">
          <HeroCard
            v-for="hero in ints"
            :key="hero.id"
            :attr="hero.primary_attr"
            :localized_name="hero.localized_name"
            :name="hero.name.split('_dota_hero_')[1]"
          />
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios"
import HeroCard from "../components/HeroCard.vue"
import { onMounted, onUpdated, ref } from 'vue'
export default {
  components: { HeroCard },
  setup() {
    const heroes = ref(null)
    const strs = ref(null)
    const agis = ref(null)
    const ints = ref(null)
    const loading = ref(true)
    onMounted(async () => {
      const { data } = await axios("https://api.opendota.com/api/heroes")
      heroes.value = data.sort((a, b) => a.name >= b.name ? 1 : -1)
      strs.value = heroes.value.filter(hero => hero.primary_attr === "str")
      agis.value = heroes.value.filter(hero => hero.primary_attr === "agi")
      ints.value = heroes.value.filter(hero => hero.primary_attr === "int")
      loading.value = false
    })
    onUpdated(() => console.log("updated"))
    return {
      loading, heroes, strs, agis, ints
    }
  }
}
</script>

<style>

</style>