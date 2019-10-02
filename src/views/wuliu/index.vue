<template>
    <div class="zf-wuliu-wrapper">
        <i-button @click="addNew">新增记录</i-button>
        <i-button @click="removeArray">删除所有</i-button>
        <TableWuliu ref="wuliutab" :cols="cols" :dat="dat" @show="show"
                    @remove="remove"></TableWuliu>
    </div>
</template>

<script>
    import TableWuliu from '@/components/table'
    import moment from 'moment'

    export default {
        name: "index",
        components: {
            TableWuliu
        },
        methods: {
            initWebSocket () { //初始化
                this.ws = new WebSocket(process.env.VUE_APP_WS_BASEURL);
                this.ws.onopen = this.websocketonopen;
                this.ws.onerror = this.websocketonerror;
                this.ws.onmessage = this.websocketonmessage;
                this.ws.onclose = this.websocketclose;
            },
            websocketonopen () { //发送
                this.ws.send('PING');
                console.log("WebSocket连接成功_ONOPEN");
                this.lockReconnect = false
            },
            websocketonerror (evt) { //错误
                console.log("WebSocket连接发生错误_ONERROR");
                console.log(evt)
                this.reconnect()
            },
            websocketonmessage (evt) { //数据接收
                //处理逻辑
                if (evt.data !== "PING") {
                    let jsdata = JSON.parse(evt.data)
                    this.dat = jsdata.data
                }
            },
            websocketclose (evt) { //关闭
                console.log("WebSocket关闭_ONCLOSE");
                this.reconnect()
            },
            reconnect () {
                let _this = this
                // eslint-disable-next-line no-console
                console.log('WebSocket尝试重连_RECONNECT', this.lockReconnect);
                if (this.lockReconnect) {
                    return;
                }
                this.lockReconnect = true;
                //没连接上会一直重连，设置延迟避免请求过多
                _this.tt && clearTimeout(_this.tt);
                _this.tt = setTimeout(() => {
                    _this.initWebSocket();
                    _this.lockReconnect = false;
                }, 5000);
            },
            show (idx) {
                console.log("显示", idx)
            },
            remove (idx) {
                console.log("删除", idx)
            },
            addNew: () => {
            },
            removeArray () {
                console.log(this.$refs.wuliutab.selected)
            }

        },
        mounted () {
            this.initWebSocket()
        },
        watch: {},
        data () {
            return {
                ws: '',
                lockReconnect: false,
                tt: '',
                dat: [
                    {
                        "id": 1,
                        "created_at": "2019-10-01T10:37:11+08:00",
                        "updated_at": "2019-10-01T10:37:11+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "1北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 2,
                        "created_at": "2019-10-01T10:53:17+08:00",
                        "updated_at": "2019-10-01T10:53:17+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "1北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 3,
                        "created_at": "2019-10-01T11:21:44+08:00",
                        "updated_at": "2019-10-01T11:21:44+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "1北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 4,
                        "created_at": "2019-10-01T11:25:32+08:00",
                        "updated_at": "2019-10-01T11:25:32+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "2北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 5,
                        "created_at": "2019-10-01T11:28:47+08:00",
                        "updated_at": "2019-10-01T11:28:47+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "2北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 6,
                        "created_at": "2019-10-01T11:35:28+08:00",
                        "updated_at": "2019-10-01T11:35:28+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 7,
                        "created_at": "2019-10-01T22:49:19+08:00",
                        "updated_at": "2019-10-01T22:49:19+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 8,
                        "created_at": "2019-10-01T22:50:21+08:00",
                        "updated_at": "2019-10-01T22:50:21+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 9,
                        "created_at": "2019-10-01T22:53:23+08:00",
                        "updated_at": "2019-10-01T22:53:23+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 10,
                        "created_at": "2019-10-01T22:57:51+08:00",
                        "updated_at": "2019-10-01T22:57:51+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 11,
                        "created_at": "2019-10-01T22:59:18+08:00",
                        "updated_at": "2019-10-01T22:59:18+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 12,
                        "created_at": "2019-10-01T23:06:23+08:00",
                        "updated_at": "2019-10-01T23:06:23+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 13,
                        "created_at": "2019-10-01T23:07:57+08:00",
                        "updated_at": "2019-10-01T23:07:57+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 14,
                        "created_at": "2019-10-01T23:15:30+08:00",
                        "updated_at": "2019-10-01T23:15:30+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 15,
                        "created_at": "2019-10-01T23:17:16+08:00",
                        "updated_at": "2019-10-01T23:17:16+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 16,
                        "created_at": "2019-10-01T23:31:49+08:00",
                        "updated_at": "2019-10-01T23:31:49+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 17,
                        "created_at": "2019-10-01T23:33:01+08:00",
                        "updated_at": "2019-10-01T23:33:01+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 18,
                        "created_at": "2019-10-01T23:33:28+08:00",
                        "updated_at": "2019-10-01T23:33:28+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 19,
                        "created_at": "2019-10-01T23:33:54+08:00",
                        "updated_at": "2019-10-01T23:33:54+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 20,
                        "created_at": "2019-10-01T23:36:32+08:00",
                        "updated_at": "2019-10-01T23:36:32+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 21,
                        "created_at": "2019-10-01T23:37:15+08:00",
                        "updated_at": "2019-10-01T23:37:15+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 22,
                        "created_at": "2019-10-01T23:37:32+08:00",
                        "updated_at": "2019-10-01T23:37:32+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 23,
                        "created_at": "2019-10-01T23:42:56+08:00",
                        "updated_at": "2019-10-01T23:42:56+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 24,
                        "created_at": "2019-10-02T00:06:14+08:00",
                        "updated_at": "2019-10-02T00:06:14+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 25,
                        "created_at": "2019-10-02T08:08:07+08:00",
                        "updated_at": "2019-10-02T08:08:07+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 26,
                        "created_at": "2019-10-02T08:49:50+08:00",
                        "updated_at": "2019-10-02T08:49:50+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 27,
                        "created_at": "2019-10-02T08:50:39+08:00",
                        "updated_at": "2019-10-02T08:50:39+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 28,
                        "created_at": "2019-10-02T08:56:25+08:00",
                        "updated_at": "2019-10-02T08:56:25+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 29,
                        "created_at": "2019-10-02T08:58:50+08:00",
                        "updated_at": "2019-10-02T08:58:50+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 30,
                        "created_at": "2019-10-02T09:02:47+08:00",
                        "updated_at": "2019-10-02T09:02:47+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 31,
                        "created_at": "2019-10-02T09:04:01+08:00",
                        "updated_at": "2019-10-02T09:04:01+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 32,
                        "created_at": "2019-10-02T09:06:56+08:00",
                        "updated_at": "2019-10-02T09:06:56+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 33,
                        "created_at": "2019-10-02T09:07:07+08:00",
                        "updated_at": "2019-10-02T09:07:07+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 34,
                        "created_at": "2019-10-02T09:08:25+08:00",
                        "updated_at": "2019-10-02T09:08:25+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 35,
                        "created_at": "2019-10-02T09:08:59+08:00",
                        "updated_at": "2019-10-02T09:08:59+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 36,
                        "created_at": "2019-10-02T09:09:05+08:00",
                        "updated_at": "2019-10-02T09:09:05+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 37,
                        "created_at": "2019-10-02T09:09:28+08:00",
                        "updated_at": "2019-10-02T09:09:28+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 38,
                        "created_at": "2019-10-02T09:09:47+08:00",
                        "updated_at": "2019-10-02T09:09:47+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 39,
                        "created_at": "2019-10-02T15:23:31+08:00",
                        "updated_at": "2019-10-02T15:23:31+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 40,
                        "created_at": "2019-10-02T15:24:12+08:00",
                        "updated_at": "2019-10-02T15:24:12+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 41,
                        "created_at": "2019-10-02T15:24:58+08:00",
                        "updated_at": "2019-10-02T15:24:58+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 42,
                        "created_at": "2019-10-02T15:26:33+08:00",
                        "updated_at": "2019-10-02T15:26:33+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 43,
                        "created_at": "2019-10-02T15:27:06+08:00",
                        "updated_at": "2019-10-02T15:27:06+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 44,
                        "created_at": "2019-10-02T15:28:49+08:00",
                        "updated_at": "2019-10-02T15:28:49+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 45,
                        "created_at": "2019-10-02T15:29:04+08:00",
                        "updated_at": "2019-10-02T15:29:04+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 46,
                        "created_at": "2019-10-02T15:31:00+08:00",
                        "updated_at": "2019-10-02T15:31:00+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 47,
                        "created_at": "2019-10-02T15:50:10+08:00",
                        "updated_at": "2019-10-02T15:50:10+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 48,
                        "created_at": "2019-10-02T15:52:17+08:00",
                        "updated_at": "2019-10-02T15:52:17+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 49,
                        "created_at": "2019-10-02T15:53:49+08:00",
                        "updated_at": "2019-10-02T15:53:49+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 50,
                        "created_at": "2019-10-02T15:54:26+08:00",
                        "updated_at": "2019-10-02T15:54:26+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 51,
                        "created_at": "2019-10-02T15:55:21+08:00",
                        "updated_at": "2019-10-02T15:55:21+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 52,
                        "created_at": "2019-10-02T15:55:40+08:00",
                        "updated_at": "2019-10-02T15:55:40+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 53,
                        "created_at": "2019-10-02T15:55:57+08:00",
                        "updated_at": "2019-10-02T15:55:57+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 54,
                        "created_at": "2019-10-02T15:58:07+08:00",
                        "updated_at": "2019-10-02T15:58:07+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 55,
                        "created_at": "2019-10-02T15:58:44+08:00",
                        "updated_at": "2019-10-02T15:58:44+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 56,
                        "created_at": "2019-10-02T16:02:38+08:00",
                        "updated_at": "2019-10-02T16:02:38+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 57,
                        "created_at": "2019-10-02T16:04:12+08:00",
                        "updated_at": "2019-10-02T16:04:12+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 58,
                        "created_at": "2019-10-02T16:06:38+08:00",
                        "updated_at": "2019-10-02T16:06:38+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 59,
                        "created_at": "2019-10-02T16:07:30+08:00",
                        "updated_at": "2019-10-02T16:07:30+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    },
                    {
                        "id": 60,
                        "created_at": "2019-10-02T16:08:53+08:00",
                        "updated_at": "2019-10-02T16:08:53+08:00",
                        "deleted_at": null,
                        "arrive_date": "2019-11-13T00:00:00+08:00",
                        "ship_date": "2019-11-13T00:00:00+08:00",
                        "store_name": "3北京大同路餐厅",
                        "order_no": 12332112,
                        "lorry": "13m",
                        "status": 3,
                        "comment": "取消"
                    }
                ],
                cols: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '餐厅名称',
                        key: 'store_name',
                        slot: 'store_name'
                    },
                    {
                        title: '到店日期',
                        key: 'arrive_date',
                        render: (h, params) => {
                            return h('span',
                                moment(params.row.arrive_date).format("YYYY-MM-DD")
                            );
                        },
                        sortable: true
                    },
                    {
                        title: '发货日期',
                        key: 'ship_date',
                        render: (h, params) => {
                            return h('span',
                                moment(params.row.ship_date).format("YYYY-MM-DD")
                            );
                        },
                        sortable: true
                    },
                    {
                        title: '订单编码',
                        key: 'order_no'
                    },
                    {
                        title: '车型',
                        key: 'lorry'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '备注',
                        key: 'comment'
                    },
                    {
                        title: '创建时间',
                        key: 'created_at',
                        slot: 'created_at',
                        render: (h, params) => {
                            return h('span',
                                moment(params.row.created_at).format("YYYY-MM-DD")
                            );
                        },
                        sortable: true
                    },
                    {
                        title: '操作',
                        width: 150,
                        slot: 'action',
                        align: 'center'
                    }
                ],
            }
        },
    }
</script>

<style scoped>

</style>
