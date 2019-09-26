<template>
<div class="zf-layout">
    <a-layout>
        <div class="zf-layout-header">
            <a-layout-header class="header">
                <div class="logo" />
                <a-menu
                        theme="dark"
                        mode="horizontal"
                        :defaultSelectedKeys="['2']"
                        :style="{ lineHeight: '64px' }"
                >
                </a-menu>
            </a-layout-header>
        </div>
        <div class="zf-layout-content">
            <a-layout-content>
                <router-view :key="key"></router-view>
            </a-layout-content>
        </div>
        <div class="zf-layout-footer">
            <a-layout-footer>Footer</a-layout-footer>
        </div>
    </a-layout>
</div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                tableData:{

                }
            }
        },
        computed:{
            key(){
                return this.$route.path
            }
        }
    }
</script>

<style lang="scss" scoped>
    .zf-layout{
        height: calc(100vh);
        width: calc(100vw);
        display: flex;
    }
    .zf-layout-content{
        background: #ffffff;
        border: 1px darkblue dashed;
        padding: 20px 20px 20px 20px;
        width: 100%;
        height: 100%;
        flex: 1;
    }
    .zf-layout-footer{
        margin-bottom: 0px;
    }
</style>
