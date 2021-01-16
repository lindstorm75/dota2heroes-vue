<template>
  <router-link :to="'/' + localized_name">
    <div className="hero-card" :style="{opacity: isValid ? 1 : .3}">
      <!-- Using Vue router link without a to path causes an error -->
      <img :src="src" :class="[{hover: true}, attr]" />  
    </div>
  </router-link>
</template>

<script>
import { onUpdated, watch } from 'vue'
export default {
  name: "HeroCard",
  props: ["name", "localized_name", "attr", "isValid"],
  setup({ name, localized_name, attr, isValid }) {
    const src = `https://cdn.dota2.com/apps/dota2/images/heroes/${name}_full.png`
    onUpdated(() => console.log("updated"))
    return {
      src, localized_name, attr, isValid
    }
  }
}
</script>