<template>
    <div class="logo-wrapper">
        <img :src="logoImg" width="100%" height="100%" alt="">
    </div>
</template>

<script>
    import logoImg from '@/assets/logo_h.png'

    export default {
        name: "index",
        data () {
            return {
                logoImg
            }
        }
    }
</script>

<style lang="scss" scoped>
    .logo-wrapper{
        width: 280px;
        height: 100%;
    }
</style>
