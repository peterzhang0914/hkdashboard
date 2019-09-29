<template>
    <div class="zf-wuliu-wrapper">
        <TableWuliu :cols="cols" :dat="dat"></TableWuliu>
        <Button @click="printInfo">a</Button>
    </div>
</template>

<script>
    import TableWuliu from '@/components/table'

    export default {
        name: "index",
        components: {
            TableWuliu
        },
        methods: {
            printInfo () {
                // eslint-disable-next-line no-console
                console.log(this.$websocket)
            }
        },
        data () {
            return {
                dat: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ],
                cols: [
                    {
                        title: 'Name',
                        slot: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
            }
        },
    }
</script>

<style scoped>

</style>
