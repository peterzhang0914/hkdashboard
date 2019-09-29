<template>
    <div class="zf-layout-wrapper">
        <Layout class="zf-layout">
            <Header class="zf-layout-header">Header</Header>
            <Content class="zf-layout-content">
                <transition name="fade-transform" mode="out-in">
                    <router-view :key="key"/>
                </transition>
            </Content>
            <Footer class="zf-layout-footer">Footer</Footer>
        </Layout>
    </div>
</template>

<script>
    export default {
        name: "layout",
        computed: {
            key () {
                return this.$route.path
            }
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .zf-layout {
        height: calc(100vh);
    }

    .zf-layout-content {
        padding: 20px;
    }

    .zf-layout-footer {
        margin-bottom: 0px;
        background-color: #c3c3c3;
    }
</style>
