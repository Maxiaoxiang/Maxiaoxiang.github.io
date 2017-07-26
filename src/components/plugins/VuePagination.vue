<template>
  <div class="mod-vuepagination">
    <div class="content">
      <div class="hd">
        <h1>Vue分页组件</h1>
      </div>
      <div class="bd">
        <div class="eg">
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
          <p>当前第
            <span class="count">{{current}}</span>页</p>
          <p class="title">HTML</p>
          <pre style="margin:15px 0;padding:10px 12px;border:#ccc 1px solid;border-left-width:4px;background-color:#fefefe;box-shadow:0 0 4px #eee;word-break:break-all;word-wrap:break-word;color:#444"><span style="color:#170">&lt;pagination</span> <span style="color:#00c">:pageCount</span>=<span style="color:#a11">"pageCount"</span> <span style="color:#00c">:current.sync</span>=<span style="color:#a11">"current"</span><span style="color:#170">&gt;</span><span style="color:#170">&lt;/pagination</span><span style="color:#170">&gt;</span></pre>
          <p>Javascript</p>
          <pre style="margin:15px 0;padding:10px 12px;border:#ccc 1px solid;border-left-width:4px;background-color:#fefefe;box-shadow:0 0 4px #eee;word-break:break-all;word-wrap:break-word;color:#444"><span style="color:#708">var</span> <span style="color:#000">app</span> = <span style="color:#708">new</span> <span style="color:#000">Vue</span>({<br>    <span style="color:#000">el</span>: <span style="color:#a11">'#app'</span>,<br>    <span style="color:#000">data</span>: {<br>        <span style="color:#000">pageCount</span>: <span style="color:#164">10</span>,     <span style="color:#a50">// 总页数</span><br>        <span style="color:#000">count</span>: <span style="color:#164">5</span>,   <span style="color:#a50">// 显示条数</span><br>        <span style="color:#000">current</span>: <span style="color:#164">1</span>     <span style="color:#a50">// 当前页 </span><br>    },<br>    <span style="color:#000">events</span>:{<br>        <span style="color:#000">callback</span>:<span style="color:#708">function</span>(<span style="color:#00f">index</span>){     <span style="color:#a50"></span><br>            <span style="color:#000">console</span>.<span style="color:#000">log</span>(<span style="color:#a11">'callback'</span>,<span style="color:#000-2">index</span>);<br>        }<br>    }<br>});</pre>
        </div>
      </div>
      <div class="ft">
        <div class="options">
          <p>options(参数配置)</p>
          <table>
            <thead>
              <tr>
                <td>参数</td>
                <td>默认值</td>
                <td class="explain">说明</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>current</td>
                <td>1</td>
                <td class="explain">当前页，类型为Number</td>
              </tr>
              <tr>
                <td>count</td>
                <td>5</td>
                <td class="explain">显示条数，类型为Number</td>
              </tr>
              <tr>
                <td>pageCount</td>
                <td>10</td>
                <td class="explain">总页数，类型为Number</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="callback">
          <p>api接口</p>
          <table>
            <thead>
              <tr>
                <td>方法</td>
                <td>参数</td>
                <td>说明</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>callback</td>
                <td>indexe</td>
                <td>回调函数，参数"index"为当前页</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
      if (index < 1) {
        index = 1;
      } else if (index > this.pageCount) {
        index = this.pageCount;
      }
      if (index != this.current && index > 0 && index <= this.pageCount) {
        this.current = index;
        console.log('callback');
      }
    }
  }
}
</script>

<style lang="scss" scope>
.content {
  position: relative;
  padding: 0 30px;
  .hd {
    h1,
    pre,
    p {
      margin-top: 10px;
    }
  }
  .pagination,
  p,
  .tips {
    margin: 10px 0;
  }
  .ft {
    p {
      margin: 10px 0;
      font-size: 18px;
    }
  }
}

.now,
.count {
  padding: 0 5px;
  color: #f00;
}

pre {
  padding: 10px;
  font-family: Monaco, Consolas, "Courier New";
}

.method {
  font-family: Monaco, Consolas, "Courier New";
}

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
