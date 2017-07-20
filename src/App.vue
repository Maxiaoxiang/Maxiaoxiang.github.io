<template>
  <div id="app">
    <mod-header></mod-header>
    <div class="container">
      <router-view></router-view>
    </div>
    <mod-footer></mod-footer>
  </div>
</template>

<script>
import header from './components/Header.vue';
import footer from './components/Footer.vue';
export default {
  components: {
    'mod-header': header,
    'mod-footer': footer
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
html {
  height: 100%;
}

body {
  position: relative;
  padding: 26px;
  font-family: "Lucida Grande", "Microsoft JhengHei", "Microsoft YaHei";
  font-size: 16px;
  color: #1e1e1e;
  background-color: #fff;
  height: 100%;
  box-sizing: border-box;
}

a {
  color: #1e1e1e;
  text-decoration: none;
  &:link,
  &:active,
  &:visited {
    color: #1e1e1e;
  }
  &:hover {
    color: #626262;
  }
}

#app {
  position: relative;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

.container {
  padding: 132px 0 26px 0;
}

.l-border {
  display: block;
  position: fixed;
  z-index: 100;
  background-color: #1e1e1e;
  border: 0px solid #fff;
}

.l-border-bottom,
.l-border-top {
  width: calc(100% - (10px * 2));
  height: 10px;
  left: 16px;
}

.l-border-left,
.l-border-right {
  height: calc(100% - (16px * 2));
  width: 10px;
  top: 16px;
}

.l-border-bottom {
  border-bottom-width: 16px;
  bottom: 0;
}

.l-border-top {
  border-top-width: 16px;
  top: 0;
}

.l-border-right {
  border-right-width: 16px;
  right: 0;
}

.l-border-left {
  border-left-width: 16px;
  left: 0;
}
</style>
