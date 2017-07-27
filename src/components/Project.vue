<template>
  <div class="mod-plugins">
    <div class="item">
      <h4>jQuery插件</h4>
      <div class="links">
        <router-link :to="{path: '/project/jquery-pagination'}">jQuery分页</router-link>
      </div>
    </div>
     <!-- <div class="item">
      <h4>Javascript插件</h4>
      <div class="links">
        <router-link :to="{path: '/project/javascript-slider'}">Javascript轮播</router-link>
      </div>
    </div>  -->
    <div class="item">
      <h4>Vue插件</h4>
      <div class="links">
        <router-link :to="{path: '/project/vue-pagination'}">Vue分页</router-link>
      </div>
    </div>
    <div class="item">
      <h4>小游戏</h4>
      <div class="links">
        <router-link :to="{path: '/project/snaker'}">贪吃蛇</router-link>
      </div>
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
  padding: 0 30px;
  overflow: hidden;
  .item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-top: -1px;
    padding-top: 20px;
    border-top: 1px solid #ccc;
  }
  .links {
    position: relative;
    display: inline-flex;
    flex-wrap: wrap;
    margin-left: 50px;
  }
  h4 {
    padding: 10px 0;
    width: 120px;
    min-width: 120px;
    font-size: 18px;
    color: #666;
    text-align: right;
  }
  a {
    display: inline-block;
    margin: 10px 20px 10px 0;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: #fff;
    transition: all 200ms ease-in-out;
    &:hover {
      background: #ccc;
    }
  }
}
</style>
