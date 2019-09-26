<template>
    <div class="logistic">
        <a-button class="editable-add-btn" @click="add">新增</a-button>
        <a-button class="editable-add-btn" @click="getData">temp</a-button>
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
    export default {
        name: "index",
        created () {
            //页面刚进入时开启长连接
            this.initWebSocket()
        },
        destroyed: function () {
            //页面销毁时关闭长连接
            this.websocketclose();
        },
        methods: {
            initWebSocket () { //初始化weosocket

                const wsuri = process.env.WS_API + "/websocket/threadsocket";//ws地址
                this.websock = new WebSocket(wsuri);
                this.websocket.onopen = this.websocketonopen;

                this.websocket.onerror = this.websocketonerror;

                this.websock.onmessage = this.websocketonmessage;
                this.websock.onclose = this.websocketclose;
            },

            websocketonopen () {
                console.log("WebSocket连接成功");
            },
            websocketonerror (e) { //错误
                console.log("WebSocket连接发生错误");
            },
            websocketonmessage (e) { //数据接收
                const redata = JSON.parse(e.data);
                //注意：长连接我们是后台直接1秒推送一条数据，
                //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
                //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
                console.log(redata.value);
            },

            websocketsend (agentData) {//数据发送
                this.websock.send(agentData);
            },

            websocketclose (e) { //关闭
                console.log("connection closed (" + e.code + ")");
            },
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
        },
        data () {
            return {
                data: [],
                columns: [{
                    title: 'No.',
                    width: '1%',
                    dataIndex: 'no',
                    key: 'no',
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
