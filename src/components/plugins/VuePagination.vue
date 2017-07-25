<template>
  <div class="mod-vuepagination">
    <div class="vuepagination">
      <ul>
        <li>
          <a href="javascript:;" @click="current-- && setCurrent(current--)" class="prev" :class="{'disabled':current == 1 || current < 0}">&lt;</a>
        </li>
        <li v-for="index in pages" :key="index" @click="setCurrent(index)">
          <a href="javascript:;" :class="{'active':current == index}">{{index}}</a>
        </li>
        <li>
          <a href="javascript:;" class="next" :class="{'disabled':current == pageCount && pageCount != 0}" @click="current++ && setCurrent(current++)">&gt;</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 1,//当前页
      pageCount: 10,//总页数
      count: 5,//显示条数
    }
  },
  computed: {
    /**
     * 计算分页
     * @return {array} page [页码]
     */
    pages() {
      let page = [];
      if (this.current < this.count) {
        var i = Math.min(this.count, this.pageCount);
        while (i) {
          page.unshift(i--);
        }
      } else {
        var middle = this.current - Math.floor(this.count / 2),
          i = this.count;
        if (middle > (this.pageCount - this.count)) {
          middle = (this.pageCount - this.count) + 1;
        }
        while (i--) {
          page.push(middle++);
        }
      }
      return page;
    }
  },
  methods: {
    setCurrent(index) {
      if (index != this.current && index > 0 && index <= this.pageCount) {
        this.current = index;
        console.log('callback');
      }
    }
  }
}
</script>

<style lang="scss" scope>
.mod-vuepagination {
  .vuepagination {
    ul {
      display: flex;
    }
    a {
      display: inline-block;
      margin: 0 5px;
      padding: 0 15px;
      height: 38px;
      line-height: 38px;
      background: #fff;
      border: 1px solid #ebebeb;
      color: #bdbdbd;
      font-size: 14px;
      text-align: center;
      color: #333;
      &:hover,
      &.active {
        border-color: #e91e63;
        background: #e91e63;
        color: #fff;
      }
      &.disabled {
        cursor: no-drop;
        background: #ccc;
        border-color: #ccc;
        color: #757575;
      }
    }
  }
}
</style>
