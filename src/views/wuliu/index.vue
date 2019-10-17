<template>
    <div class="zf-wuliu-wrapper">
        <Modal v-model="mdl"
               title="物流信息"
               @on-cancel="cancel"
        >
            <WuliuForm ref="wlform" @closeModal="closeModal"></WuliuForm>
            <div slot="footer"></div>
        </Modal>
        <Modal v-model="mdlSearch"
               title="信息搜索"
               @on-cancel="cancel"
        >
            <WuliuFormSearch ref="wlformsearch" @closeModal="closeModalSearch"></WuliuFormSearch>
            <div slot="footer"></div>
        </Modal>
        <div class="zf-wuliu-button-group">
            <Button class="zf-wuliu-button" type="primary" @click="addRecord">新增记录</Button>
            <Button class="zf-wuliu-button" type="error" @click="removeArray">删除所选</Button>
            <Button class="zf-wuliu-button" type="success" @click="searchRecord">高级搜索</Button>
            <Button class="zf-wuliu-button" type="success" @click="cleanSearch">清空搜索</Button>
            <Button class="zf-wuliu-button" @click="toggleAutomation">
                {{this.automation===false?"自动刷新":"停止刷新"}}
            </Button>
            <Button class="zf-wuliu-button" @click="logoff">注销</Button>
            <WuliuPage class="zf-wuliu-pager" :dataCount="pageObj.dataCount" :pageSize="pageObj.pageSize"
                       :currentPage="pageObj.currPage"
                       @changePager="changePager"></WuliuPage>
        </div>
        <WuliuTable ref="wuliutab" :cols="cols" :dat="page_dat" :loading="loading" @edit="edit"></WuliuTable>
    </div>
</template>

<script>
    import WuliuTable from '@/components/wuliu/table'
    import WuliuForm from '@/components/wuliu/form'
    import WuliuFormSearch from '@/components/wuliu/formSearch'
    import WuliuPage from '@/components/common/pager'
    import moment from 'moment'
    import {getToken} from "@/utils/cookies";

    export default {
        name: "index",
        components: {
            WuliuTable,
            WuliuForm,
            WuliuFormSearch,
            WuliuPage
        },
        methods: {
            initWebSocket () { //初始化
                let token = getToken()
                this.ws = new WebSocket(process.env.VUE_APP_WS_BASEURL, [token]);
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
                this.reconnect()
            },
            websocketonmessage (evt) { //数据接收
                //处理逻辑
                console.log("WebSocket连接收到信息_ONMESSAGE")
                if (evt.data !== "PING" && evt.data !== "" && evt.data !== undefined) {
                    let jsdata = JSON.parse(evt.data)
                    this.$store.commit('logistics/SET_ALL_LOGISTICS', jsdata.data)
                }
            },
            websocketclose (evt) { //关闭
                console.log("WebSocket关闭_ONCLOSE");
                // this.reconnect()
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
            edit (row) {
                this.$refs.wlform.actionType = 2
                this.mdl = true
                for (let x in row) {
                    //把row值赋予表单
                    if (this.$refs.wlform.formValidate[x] !== undefined) {
                        this.$refs.wlform.formValidate[x] = row[x]
                    }
                }
                //更新的时候带上id，服务器端使用save
                this.$refs.wlform.formValidate['id'] = row['id']

            },
            logoff () {
                this.$store.dispatch('auth/logoff').then(resp => {
                    if (resp.errno === 0) {
                        location.reload()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            removeArray () {
                if (this.$refs.wuliutab.selected.length === 0) {
                    this.$Message.info("请选择要删除的数据")
                } else {
                    this.$store.dispatch('logistics/deleteLogistics', this.$refs.wuliutab.selected).then(resp => {
                        this.$Message.info("删除成功")
                        this.closeModal()
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            addRecord () {
                this.$refs.wlform.actionType = 1
                this.mdl = true
                this.$refs.wlform.handleReset('formValidate')
            },
            cancel () {
                this.$refs.wlform.handleReset('formValidate');
                this.$refs.wlformsearch.handleReset('formSearchValidate')
            },
            closeModal () {
                this.cancel()
                this.mdl = false
            },
            closeModalSearch () {
                this.cancel()
                this.mdlSearch = false
            },
            changePager (idx) {
                let _start = (idx - 1) * this.pageObj.pageSize;
                let _end = idx * this.pageObj.pageSize;
                this.page_dat = this.dat.slice(_start, _end);
                this.pageObj.currPage = idx;
                this.pageObj.hasNext = this.pageObj.currPage === this.pageObj.totalPage ? false : true;
            },
            initPageObj () {
                this.pageObj.dataCount = 0;
                this.pageObj.pageSize = 14;
                this.pageObj.currPage = 1;
                this.pageObj.totalPage = 0;
                this.pageObj.hasNext = false
            },
            handleAllData (newData) {
                //监听到新数据进入后,清除timer，重新计算pageObj对象
                this.initPageObj()
                // 保存取到的所有数据
                this.dat = newData;
                console.log(this.dat)
                this.pageObj.dataCount = this.dat.length
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if (this.dat.length <= this.pageObj.pageSize) {
                    this.page_dat = this.dat;
                    this.pageObj.hasNext = false
                } else {
                    this.page_dat = this.dat.slice(0, this.pageObj.pageSize);
                    this.pageObj.hasNext = true
                }
                this.pageObj.totalPage = Math.ceil(this.dat.length / this.pageObj.pageSize)
                if (this.pageObj.totalPage === 0) {
                    this.pageObj.totalPage = 1
                }
            },
            startPageTimer () {
                let _this = this
                _this.pageTimer = setInterval(() => {
                    if (_this.pageObj.hasNext) {
                        _this.changePager(_this.pageObj.currPage + 1)
                    } else {
                        _this.changePager(1)
                    }
                }, 5000);
            },

            toggleAutomation () {
                this.automation = !this.automation;
                if (this.automation === true) {
                    this.$store.dispatch('logistics/getAllLogistics');
                    this.initWebSocket();
                    this.initPageObj()
                    this.startPageTimer()
                } else {
                    // this.ws.onmessage = () => {
                    // }
                    clearInterval(this.pageTimer);
                    clearTimeout(this.tt);
                    this.pageTimer = undefined;
                    this.tt = undefined;
                }
            },

            searchRecord () {
                //停止自动刷新，关闭websocket
                this.automation = true
                this.toggleAutomation()
                //打开搜索modal
                this.mdlSearch = !this.mdlSearch
            },
            cleanSearch () {
                this.$store.dispatch('logistics/getAllLogistics')
                this.ws.onmessage = this.websocketonmessage()
            }
        },
        mounted () {
            this.$store.dispatch('logistics/getAllLogistics').then(resp => {

            }).catch(err => {
                console.log(err)
            });
            if (this.automation) {
                this.initWebSocket();
                this.startPageTimer()
            }

        }
        ,
        computed: {
            cmpAllLogistics () {
                return this.$store.getters.ALL_LOGISTICS
            }
        }
        ,
        watch: {
            // eslint-disable-next-line no-unused-vars
            cmpAllLogistics (newval, oldval) {
                this.handleAllData(newval)
            }
        }
        ,
        data () {
            return {
                automation: true,
                ws: '',
                lockReconnect: false,
                tt: '',
                pageTimer: '',
                mdl: false,
                mdlSearch: false,
                dat: [],
                page_dat: [],
                loading: false,
                pageObj: {
                    dataCount: 0,
                    pageSize: 0,
                    currPage: 1,
                    totalPage: 0,
                    hasNext: false,
                },
                cols: [

                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '城市',
                        key: 'city',
                        width: 100,
                    },
                    {
                        title: '名称',
                        key: 'store_name',
                        width: 130,
                    },
                    {
                        title: '餐厅类型',
                        key: 'store_type',
                        width: 100,
                    },
                    {
                        title: '到店日期',
                        key: 'arrive_date',
                        width: 130,
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
                        width: 130,
                        render: (h, params) => {
                            return h('span',
                                moment(params.row.ship_date).format("YYYY-MM-DD")
                            );
                        },
                        sortable: true
                    },
                    {
                        title: '配货日期',
                        key: 'pick_date',
                        width: 130,
                        render: (h, params) => {
                            return h('span',
                                moment(params.row.pick_date).format("YYYY-MM-DD")
                            );
                        },
                        sortable: true
                    },
                    {
                        title: '订单编码',
                        key: 'order_no',
                        minWidth: 100,
                    },
                    {
                        title: '运输车型',
                        key: 'lorry',
                        width: 100,
                    },
                    {
                        title: '配货状态',
                        key: 'status',
                        width: 100,
                    },
                    {
                        title: '备注信息',
                        key: 'comment',
                        minWidth: 100,
                    },
                    {
                        title: '更新时间',
                        key: 'updated_at',
                        width: 130,
                        render: (h, params) => {
                            return h('span',
                                moment(params.row.updated_at).format("YYYY-MM-DD")
                            );
                        },
                        sortable: true
                    },
                    {
                        title: '操作',
                        width: 80,
                        slot: 'action',
                        align: 'center'
                    }
                ],
            }
        }
        ,
    }
</script>

<style lang="scss" scoped>
    .zf-wuliu-wrapper {

        .zf-wuliu-button-group {
            display: flex;
            margin-bottom: 5px;

            .zf-wuliu-button {
                margin-left: 5px;
            }

            .zf-wuliu-pager {
                margin-left: 5px;
                float: right;
            }
        }

    }


</style>
