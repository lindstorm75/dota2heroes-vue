<template>
  <div className="center-container">
      <div className="heading-container">
        <h1 className="heading">Dota 2 Heroes</h1>
      </div>
      <div className="container">
        <h2 className="attr" :style="{color: '#EF4444'}">strength</h2>
        <h1 v-if="loading">Loading...</h1>
        <div v-else className="hero-container">
          <HeroCard v-for="hero in heroes" :key="hero.id" :name="hero.name.split('_dota_hero_')[1]" />
        </div>
      </div>
    </div>
</template>

<script>
import HeroCard from "../components/HeroCard.vue"
import { onMounted, onUpdated, ref } from 'vue'
export default {
  components: { HeroCard },
  setup() {
    const heroes = ref(null)
    const loading = ref(true)
    onMounted(async () => {
      const res = await fetch("https://api.opendota.com/api/heroes")
      const data = await res.json()
      heroes.value = data
      console.log(data)
      loading.value = false
    })
    onUpdated(() => console.log("updated", console.log(heroes.value)))
    return {
      loading,
      heroes
    }
  }
}
</script>

<style>

</style>