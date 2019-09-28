<template>
    <div class="logistic">
        <a-button class="editable-add-btn" @click="add">新增</a-button>
        <a-button class="editable-add-btn" @click="printInfo">temp</a-button>
        <a-button class="editable-add-btn" @click="printInfo">print</a-button>
        <a-table
                :columns="columns"
                :rowKey="record => record.id"
                :dataSource="data"
                bordered>
         <span class="actions" slot="action" slot-scope="record">
             <a-button class="editable-update-btn">更新</a-button>
             <a-button class="editable-remove-btn">删除</a-button>
         </span>
        </a-table>
    </div>
</template>

<script>
    import wsocket from '@/utils/wstools'

    export default {
        name: "index",

        methods: {
            add () {
            },
            update () {

            },
            delete () {

            },
            getData () {
                this.$store.dispatch('logistic/getLogistic').then(resp => {
                    this.data = resp.data
                }).catch(err => {
                    // eslint-disable-next-line no-console
                    console.log(err)
                })
            },
            printInfo () {
                console.log(this.ws)
            },
        }
        ,
        beforeDestroy () {
            this.ws.close();
            this.ws = Object;
        },
        computed: {},
        watch: {}
        ,
        data () {
            return {
                ws: wsocket,
                data: [],
                columns: [{
                    title: 'No.',
                    width: '1%',
                    dataIndex: 'id',
                    key: 'id',
                    slots: {title: 'no'},
                    scopedSlots: {customRender: 'no'},
                }, {
                    title: '到店日期',
                    width: '14%',
                    dataIndex: 'arrive_date',
                    key: 'arrive_date',
                }, {
                    title: '发货日期',
                    width: '14%',
                    dataIndex: 'ship_date',
                    key: 'ship_date',
                }, {
                    title: '餐厅名称',
                    dataIndex: 'store_name',
                    key: 'store_name',
                }, {
                    title: '订单编号',
                    dataIndex: 'order_no',
                    key: 'order_no',
                }, {
                    title: '车型',
                    dataIndex: 'lorry',
                    key: 'lorry',
                }, {
                    title: '状态',
                    key: 'status',
                    dataIndex: 'status',
                    scopedSlots: {customRender: 'tags'},
                }, {
                    title: '备注',
                    key: 'comments',
                    dataIndex: 'comments',
                    scopedSlots: {customRender: 'tags'},
                }, {
                    title: '操作',
                    key: 'action',
                    scopedSlots: {customRender: 'action'},
                }],
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dashboard {
        display: block;
        height: 100%;
    }

    .editable-add-btn {
        margin-bottom: 15px;
    }

    .actions {
        display: flex;

        .editable-update-btn {
            &.editable-remove-btn {
                margin: 0 10px;
            }
        }
    }
</style>
