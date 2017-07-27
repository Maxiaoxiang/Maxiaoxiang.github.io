<template>
    <div class="mod-slider">
        <div class="content">
            <div class="hd">
                <h1>广告轮播-slider</h1>
                <p>直接引入javascriptslider.js</p>
                <pre class="bad">&lt;script&nbsp;src="javascript.slider.js"&gt;&lt;/script&gt;</pre>
                <!-- <p>组件样式与功能分离，自定义样式（注：这里加样式是为了示例看的清楚，操作方便。）</p> -->
            </div>
            <div class="bd">
                <div class="eg">
                    <div id="box"></div>
                    <p>HTML</p>
                    <pre style="margin:15px 0;padding:10px 12px;border:#ccc 1px solid;border-left-width:4px;background-color:#fefefe;box-shadow:0 0 4px #eee;word-break:break-all;word-wrap:break-word;color:#444"><span style="color:#170">&lt;div</span> <span style="color:#00c">id</span>=<span style="color:#a11">"box"</span><span style="color:#170">&gt;</span><span style="color:#170">&lt;/div</span><span style="color:#170">&gt;</span></pre>
                    <p>Javascript</p>
                    <pre style="margin:15px 0;padding:10px 12px;border:#ccc 1px solid;border-left-width:4px;background-color:#fefefe;box-shadow:0 0 4px #eee;word-break:break-all;word-wrap:break-word;color:#444"><span style="color:#708">var</span> <span style="color:#000">options</span> = {<br>    <span style="color:#000">id</span>: <span style="color:#a11">'first'</span>,<br>    <span style="color:#000">duration</span>: <span style="color:#164">1200</span>,<br>    <span style="color:#000">data</span>: <span style="color:#000">data</span><br>}<br><span style="color:#708">var</span> <span style="color:#000">slider</span> = <span style="color:#708">new</span> <span style="color:#000">Slider</span>(<span style="color:#000">options</span>);</pre>
                </div>
                <div class="eg">
                    <div id="box2"></div>
                    <p>HTML</p>
                    <pre style="margin:15px 0;padding:10px 12px;border:#ccc 1px solid;border-left-width:4px;background-color:#fefefe;box-shadow:0 0 4px #eee;word-break:break-all;word-wrap:break-word;color:#444"><span style="color:#170">&lt;div</span> <span style="color:#00c">id</span>=<span style="color:#a11">"box2"</span><span style="color:#170">&gt;</span><span style="color:#170">&lt;/div</span><span style="color:#170">&gt;</span></pre>
                    <p>Javascript</p>
                    <pre style="margin:15px 0;padding:10px 12px;border:#ccc 1px solid;border-left-width:4px;background-color:#fefefe;box-shadow:0 0 4px #eee;word-break:break-all;word-wrap:break-word;color:#444"><span style="color:#708">var</span> <span style="color:#000">options2</span> = {<br>    <span style="color:#000">id</span>: <span style="color:#a11">'second'</span>,<br>    <span style="color:#000">target</span>: <span style="color:#a11">'box2'</span>,<br>    <span style="color:#000">duration</span>: <span style="color:#164">500</span>,<br>    <span style="color:#000">data</span>: <span style="color:#000">data2</span><br>}<br><span style="color:#708">var</span> <span style="color:#000">slider2</span> = <span style="color:#708">new</span> <span style="color:#000">Slider</span>(<span style="color:#000">options2</span>);</pre>
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
                                <td>id</td>
                                <td>'wrapper'</td>
                                <td class="explain">当前标识</td>
                            </tr>
                            <tr>
                                <td>target</td>
                                <td>'box'</td>
                                <td class="explain">插入目标容器id，如果查找不到dom将插入到body</td>
                            </tr>
                            <tr>
                                <td>duration</td>
                                <td>5000</td>
                                <td class="explain">轮播间隔时间</td>
                            </tr>
                            <tr>
                                <td>data</td>
                                <td>array</td>
                                <td class="explain">数据</td>
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
                                <td>start()</td>
                                <td>无</td>
                                <td>开始</td>
                            </tr>
                            <tr>
                                <td>next()</td>
                                <td>index</td>
                                <td>下一项</td>
                            </tr>
                            <tr>
                                <td>stop()</td>
                                <td>无</td>
                                <td>暂停轮播</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const Slider = require('../../assets/script/plugins/javascript/slider');
/**
 * 模拟数据
 * @title 标题
 * @url   链接
 * @img   图片
 */
const data = [{
    title: '迷你发光字体制作',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=408993445,3121105811&fm=76'
}, {
    title: '发光文字制作',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=4188200074,4015041832&fm=76'
}, {
    title: '效果图制作',
    url: 'https://www.baidu.com',
    img: 'http://f12.baidu.com/it/u=1861613996,2618325232&fm=76'
}, {
    title: '电子签名',
    url: 'https://www.baidu.com',
    img: 'http://f12.baidu.com/it/u=160246100,1126827621&fm=76'
}, {
    title: '游戏怎么制作',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=928850446,1166297221&fm=76'
}, {
    title: '游戏网友排行榜',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=460157059,2153048744&fm=76'
}, {
    title: '游戏制作学习',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=2437358158,3159758744&fm=76'
}, {
    title: '发光文字制作',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=4188200074,4015041832&fm=76'
}, {
    title: '电子签名',
    url: 'https://www.baidu.com',
    img: 'http://f12.baidu.com/it/u=160246100,1126827621&fm=76'
}, {
    title: '游戏怎么制作',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=928850446,1166297221&fm=76'
}, {
    title: '游戏网友排行榜',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=460157059,2153048744&fm=76'
}, {
    title: '游戏制作学习',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=2437358158,3159758744&fm=76'
}, {
    title: '发光文字制作',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=4188200074,4015041832&fm=76'
}, {
    title: '电子签名',
    url: 'https://www.baidu.com',
    img: 'http://f12.baidu.com/it/u=160246100,1126827621&fm=76'
}];

const data2 = [{
    title: '1',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=408993445,3121105811&fm=76'
}, {
    title: '2',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=4188200074,4015041832&fm=76'
}, {
    title: '3',
    url: 'https://www.baidu.com',
    img: 'http://f12.baidu.com/it/u=1861613996,2618325232&fm=76'
}, {
    title: '4',
    url: 'https://www.baidu.com',
    img: 'http://f12.baidu.com/it/u=160246100,1126827621&fm=76'
}, {
    title: '5',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=928850446,1166297221&fm=76'
}, {
    title: '6',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=460157059,2153048744&fm=76'
}, {
    title: '7',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=2437358158,3159758744&fm=76'
}, {
    title: '8',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=4188200074,4015041832&fm=76'
}, {
    title: '9',
    url: 'https://www.baidu.com',
    img: 'http://f12.baidu.com/it/u=160246100,1126827621&fm=76'
}, {
    title: '游戏怎么制作',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=928850446,1166297221&fm=76'
}, {
    title: '游戏网友排行榜',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=460157059,2153048744&fm=76'
}, {
    title: '游戏制作学习',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=2437358158,3159758744&fm=76'
}, {
    title: '发光文字制作',
    url: 'https://www.baidu.com',
    img: 'http://f11.baidu.com/it/u=4188200074,4015041832&fm=76'
}, {
    title: '电子签名',
    url: 'https://www.baidu.com',
    img: 'http://f12.baidu.com/it/u=160246100,1126827621&fm=76'
}];
export default {
    name: 'slider',
    data() {
        return {
            slider: {},
            slider2: {}
        }
    },
    created() {
        let options = {
            id: 'first',
            duration: 1200,
            data: data
        }
        this.slider = new Slider(options);
        let options2 = {
            id: 'second',
            target: 'box2',
            duration: 500,
            data: data2
        }
        this.slider2 = new Slider(options2);
    },
    methods: {

    },
    beforeRouteLeave(to, from, next) {
        console.log(this.slider);
        // next();
    }
}
</script>
<style lang="scss">
@import '../../assets/style/public/common.scss';
@import '../../assets/style/plugins/javascript/slider.scss';
.mod-lunbo-slider {
    margin-bottom: 15px;
}

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
    .tips {
        margin: 10px 0;
    }
    .ft {
        p {
            margin: 10px 0;
            font-size: 18px;
        }
    }
    .eg img {
        max-width: none;
        min-height: inherit;
    }
}
</style>