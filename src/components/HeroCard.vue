<template>
  <div className="hero-card">
    <!-- Using Vue router link without a to path causes an error -->
    <img :src="src" />  
  </div>
</template>

<script>
export default {
  name: "HeroCard",
  props: ["name"],
  setup(props) {
    const src = `https://cdn.dota2.com/apps/dota2/images/heroes/${props.name}_full.png`
    return {
      src
    }
  }
}
</script>