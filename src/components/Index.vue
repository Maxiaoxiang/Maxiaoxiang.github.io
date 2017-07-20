<template>
  <div class="mod-main">
    <div class="bd">
      <div class="image">
         <img src="../assets/image/old.jpg"> 
      </div>
      <div class="text">
        <div class="txt">
          <h1>古城小巷</h1>
        </div>
        <div class="information">
          <p class="address">中国 福建省 南平市</p>
          <p class="date">2017年6月17日</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * TODO:
 * 请求mock接口返回数据，每天/次随机取数据
 */
export default {
}
</script>

<style lang="scss" scope>
.mod-main {
  position: relative;
  padding: 16px;
  min-width: 960px;
  box-sizing: border-box;
  .bd {
    display: flex;
    justify-content: center;
  }
  .image {
    width: 500px;
    height: 667px;
    background: #ccc;
    img {
      width: 100%;
    }
  }
  .text {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 60px;
    padding: 96px 0 16px;
    width: 400px;
  }
  h1 {
    padding: 10px 0;
  }
  p {
    line-height: 2;
  }
}
</style>
