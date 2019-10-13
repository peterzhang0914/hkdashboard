<template>

    <Page :current="currentPage" :total="dataCount" :page-size="pageSize" @on-change="changePage" show-total/>

</template>

<script>
    export default {
        name: "index",
        props: [
            "dataCount",
            "pageSize",
            "currentPage"
        ],
        methods: {
            changePage (idx) {
                this.$emit("changePager", idx)
            }
        }
    }
</script>

<style scoped>

</style>
