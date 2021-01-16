<template>
  <div className="filter">
    <p>FILTER</p>
    <select id="role" @change="filterRole">
      <option v-for="role in roles" :key="role">{{ role }}</option>
    </select>
    <select id="atk_type" @change="filterAttackType">
      <option v-for="type in attackTypes" :key="type">{{ type }}</option>
    </select>
    <select id="name" @change="filterName">
      <option>HERO NAME</option>
    </select>
    <button onClick={clearFilter}>CLEAR</button>
  </div>
</template>

<script>
import { onUpdated, ref } from 'vue'
export default {
  name: "FilterOption",
  props: ["names"],
  setup({ names }, { emit }) {

    const roles = [
      "BY ROLE", "ALL", "CARRY", "DISABLER", "LANE SUPPORT", "INITIATOR", "JUNGLER",
      "SUPPORT", "DURABLE", "NUKER", "PUSHER", "ESCAPE"
    ]
    const attackTypes = ["BY ATTACK TYPE", "ALL", "MELEE", "RANGED"]

    const selectedRole = ref(roles[0])

    const filterRole = () => emit("roleChange", selectedRole.value)

    return {
      selectedRole, roles, attackTypes, filterRole
    }
  }
}
</script>