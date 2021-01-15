<template>
  <router-link :to="'/' + localized_name">
    <div className="hero-card">
      <!-- Using Vue router link without a to path causes an error -->
      <img :src="src" :class="[{hover: true}, attr]" />  
    </div>
  </router-link>
</template>

<script>
export default {
  name: "HeroCard",
  props: ["name", "localized_name", "attr"],
  setup({ name, localized_name, attr }) {
    const src = `https://cdn.dota2.com/apps/dota2/images/heroes/${name}_full.png`
    return {
      src, localized_name, attr
    }
  }
}
</script>