<template>
    <div>
        <Table border ref="selection" @on-selection-change="onSelectChange" :columns="cols" :data="dat">
            <template slot-scope="{ row }" slot="store_name">
                <strong>{{ row.store_name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="created_at">
                <strong>{{ row.created_at }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="showItem(index)">View</Button>
                <Button type="error" size="small" @click="removeItem(index)">Delete</Button>
            </template>
        </Table>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: ['cols', 'dat'],
        data () {
            return {
                selected: [],
            }
        },
        methods: {
            showItem (idx) {
                this.$emit('show', idx)
            },
            removeItem (idx) {
                this.$emit('remove', idx)
            },
            onSelectChange (data) {
                let selections = [];
                data.forEach((x) => {
                    selections.push(x.id)
                });
                this.selected = selections
            },

        }
    }
</script>

<style scoped>

</style>
