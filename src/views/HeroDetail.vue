<template>
  <h1 v-if="loading">Loading</h1>
  <template v-else>
    <NotFound v-if="notFound" />
    <div v-else className="center-container">
      <h1 className="heading">{{ hero.localized_name }}</h1>
        <div className="hero-image-container">
          <img
            :alt="hero.name"
            :src="src"
            :style="{width: '20rem', borderColor: color}"
          />
        </div>
        <div style="{display: 'flex', alignItems: 'center', justifyContent: 'center'}">
          <h2 className="border-attr attr" :style="{color}">{{ attr }}</h2>
        </div>
        <h3 className="sub-heading">{{ hero.attack_type }}<span :style="{color: 'gray'}">{{ roles }}</span></h3>
    </div>
  </template>
</template>

<script>
import { computed, onMounted, onUpdated, ref } from 'vue'
import { useRoute } from "vue-router"
import axios from "axios"
import NotFound from './NotFound.vue'
export default {
  components: { NotFound },
  name: "HeroDetail",
  setup() {
    const route = useRoute()

    const hero = ref(null)
    const loading = ref(true)
    const src = ref(null)
    const roles = ref(null)
    const color = ref(null)
    const attr = ref(null)

    const notFound = ref(false)

    onMounted(async () => {
      const { data } = await axios("https://api.opendota.com/api/heroes/")
      hero.value = data.find(hero => hero.localized_name === route.params.name)
      loading.value = false
      if (hero.value === undefined) return notFound.value = true
      src.value = `https://cdn.dota2.com/apps/dota2/images/heroes/${hero.value.name.split("_dota_hero_")[1]}_full.png`
      roles.value = hero.value.roles.reduce((acc, cur) => acc + " - " + cur, "")
      switch(hero.value.primary_attr) {
        case "str": color.value = "#EF4444"; attr.value = "strength"; break;
        case "agi": color.value = "#10B981"; attr.value = "agility"; break;
        default: color.value = "#3B82F6"; attr.value = "inteligence";
      }
    })
    return {
      hero, loading, src, roles, color, attr, notFound
    }
  }
}
</script>

<style>

</style>