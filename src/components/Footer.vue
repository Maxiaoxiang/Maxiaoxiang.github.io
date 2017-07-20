<template>
  <div class="footer">
    <div class="corner">
      <a href="http://github.com/Maxiaoxiang" target="_blank">Mss。</a>
      <span class="spe">/</span>Powered by
      <a href="http://maxiaoxiang.com" target="_blank">Maxiaoxiang</a>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scope>
.footer {
  flex: 0 0 auto;
  position: relative;
  margin-top: -66px;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  z-index: 9;
  .corner {
    font-family: "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", tahoma, arial, simsun, "\5B8B\4F53";
    font-size: 12px;
    opacity: .5;
    .spe {
      padding: 0 5px;
    }
  }
}
</style>
