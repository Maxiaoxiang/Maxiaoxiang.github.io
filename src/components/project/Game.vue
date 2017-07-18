<template>
  <div class="mod-game">
    游戏
    <router-view></router-view>
    <router-link :to="{path: '/project/game/snaker'}">贪吃蛇</router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scope>

</style>
