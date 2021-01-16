<template>
  <div className="center-container">
      <div className="heading-container">
        <h1 className="heading">Dota 2 Heroes</h1>
      </div>
      <FilterOption @roleChange="filterRole" />
      <h2 v-if="loading">Loading...</h2>
      <div v-else className="container">
        <h2 className="attr" :style="{color: '#EF4444'}">strength</h2>
        <div className="hero-container">
          <HeroCard
            v-for="hero in filteredStrs"
            :key="hero.id"
            :attr="hero.primary_attr"
            :localized_name="hero.localized_name"
            :name="hero.name.split('_dota_hero_')[1]"
            :isValid="hero.valid"
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
            v-model:isValid="hero.valid"
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
            :isValid="filteredInts.includes(hero.name)"
          />
        </div>
      </div>
    </div>
</template>

<script>
import axios from "axios"
import HeroCard from "../components/HeroCard.vue"
import FilterOption from "../components/FilterOption.vue"
import { computed, onMounted, onUpdated, reactive, ref, watch } from 'vue'
export default {
  components: { HeroCard, FilterOption },
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
      filteredStrs.value = strs.value.map(str => {
        str.valid = true
        return str
      })
      loading.value = false
    })

    const currentRole = ref("BY ROLE")

    const filteredStrs = computed(() => {
      const test = currentRole.value
      if (strs.value === null) return []
      else {
        if (currentRole.value === "BY ROLE" || currentRole.value === "ALL")
          return strs.value.map(str => { str.valid = true; return str })
        const role = selectedRole.value[0] + selectedRole.value.substring(1).toLowerCase()
        return strs.map(str => {
          if (str.roles.includes(role)) str.valid = true
          else str.valid = false
          return str
        })
      }
    })

    // const filteredStrs = computed(() => {
    //   const currentRole = selectedRole.value[0] + selectedRole.value.substring(1).toLowerCase()
    //   if (Array.isArray(strs.value)) {
    //     if (selectedRole.value === "BY ROLE" || selectedRole.value === "ALL")
    //       return strs.value.map(hero => {
    //         hero.valid = true
    //         return hero
    //       })
    //     return strs.value.map(hero => {
    //       if (hero.roles.includes(currentRole)) 
    //         hero.valid = true
    //       return hero
    //     })
    //   }
    //   return []
    // })

    const filteredAgis = computed(() => {
      const currentRole = selectedRole.value[0] + selectedRole.value.substring(1).toLowerCase()
      if (Array.isArray(agis.value)) {
        if (selectedRole.value === "BY ROLE" || selectedRole.value === "ALL")
          return agis.value.map(hero => hero.name)
        return agis.value.filter(str => str.roles.includes(currentRole)).map(hero => hero.name)
      }
      else return []
    })

    // computed will always be the same object thus Vue won't rerender.
    const filteredInts = computed(() => {
      const currentRole = selectedRole.value[0] + selectedRole.value.substring(1).toLowerCase()
      if (Array.isArray(ints.value)) {
        if (selectedRole.value === "BY ROLE" || selectedRole.value === "ALL")
          return ints.value.map(hero => hero.valid = true)
        return ints.value.filter(str => str.roles.includes(currentRole)).map(hero => hero.name)
      }
      else return []
    })

    const filterRole = role => {
      currentRole.value = role
    }

    return {
      loading, heroes, filterRole, filteredStrs, strs
    }
  }
}
</script>

<style>

</style>