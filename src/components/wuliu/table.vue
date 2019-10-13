<template>
    <div>
        <Table class="wuliutab" stripe border ref="selection" @on-selection-change="onSelectChange" :columns="cols"
               :data="dat"
               :height="tableHeight"
               :loading="loading"
        >
            <template slot-scope="{ row }" slot="action">
                <Button type="success" size="small" style="margin-right: 5px" @click="editItem(row)">编辑</Button>
            </template>
        </Table>
    </div>
</template>

<script>
    export default {
        name: "index",
        props: ['cols', 'dat', 'loading'],
        data () {
            return {
                selected: [],
                tableHeight: 450,
            }
        },
        mounted () {
            this.tableHeight = window.innerHeight - this.$refs.selection.$el.offsetTop - 65
        },
        methods: {
            editItem (idx) {
                this.$emit('edit', idx)
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

<style lang="scss">
    .wuliutab {
        font-family: "Microsoft YaHei", "微软雅黑", Arial, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", sans-serif;
    }

    .ivu-table {
        font-size: 15px;
        font-weight: bolder;
    }

</style>
