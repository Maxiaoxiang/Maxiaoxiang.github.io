<template>
    <div class="mod-message">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            data: ''
        }
    },
    //实例化后调用
    created() {
        this.getIssues();
    },
    methods: {
        //issue
        getIssues() {
            this.$http.get('https://api.github.com/repos/Maxiaoxiang/Maxiaoxiang.github.io/issues')
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error('请求失败：' + error);
                });
        }
    }
}
</script>

<style lang="scss" scope>

</style>
