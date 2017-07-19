<template>
  <div class="mod-plugins">
    <div class="navs">
      <ul>
        <li>
          <router-link :to="{path: '/project/jquery'}">jQuery插件</router-link>
        </li>
        <li>
          <router-link :to="{path: '/project/vue'}">Vue插件</router-link>
        </li>
        <li>
          <router-link :to="{path: '/project/game'}">游戏</router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scope>
.mod-plugins {
  position: relative;
  display: flex;
  .navs {
    width: 200px;
    text-align: center;
    a {
      display: block;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: #f1f1f1;
      }
    }
  }
}
</style>
