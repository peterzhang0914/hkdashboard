<template>
    <div class="layout">
        <Layout>
            <Header class="zf-layout-header">

                <ALogo></ALogo>

            </Header>
            <Content class="zf-layout-content">
                <transition name="fade-transform" mode="out-in">
                    <router-view :key="key"/>
                </transition>
            </Content>
            <Footer class="zf-layout-footer">@HKIChina Support</Footer>
        </Layout>
    </div>
</template>

<script>
    import ALogo from "@/components/logo"

    export default {
        name: "layout",
        components: {
            ALogo
        },
        computed: {
            key () {
                return this.$route.path
            }
        },
        methods: {}
    }
</script>


<style lang="scss" scoped>
    .zf-layout-header {
        display: flex;
        justify-content: center;
    }


    .zf-layout-content {
        padding: 10px;
        height: calc(100vh - 130px);
    }

    .zf-layout-footer {
        /*display: block;*/
        margin-bottom: 0px;
        background-color: #c3c3c3;
    }
</style>
