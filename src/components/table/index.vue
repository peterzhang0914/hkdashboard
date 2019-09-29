<template>
    <Table border :columns="cols" :data="dat">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
            <Button type="error" size="small" @click="remove(index)">Delete</Button>
        </template>
    </Table>
</template>

<script>
    export default {
        name: "index",
        props: {
          cols:Array,
          dat:Array,
        },
        data () {
            return {

            }
        }
    }
</script>

<style scoped>

</style>
