<template>
    <div class="wuliu-form">

        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="id" prop="id" hidden>
                <Input v-model="formValidate.id" placeholder="id"></Input>
            </FormItem>
            <FormItem label="餐厅名称" prop="store_name">
                <Input v-model="formValidate.store_name" placeholder="输入餐厅名称"></Input>
            </FormItem>
            <FormItem label="所在城市" prop="city">
                <Input v-model="formValidate.city" placeholder="餐厅所在城市"></Input>
            </FormItem>
            <FormItem label="订单编码" prop="order_no">
                <Input v-model="formValidate.order_no" placeholder="订单编码"></Input>
            </FormItem>
            <FormItem label="运输车型" prop="lorry">
                <!--                <Select v-model="formValidate.lorry" placeholder="运输车型">-->
                <!--                    <Option value="6米8">6米8</Option>-->
                <!--                    <Option value="9米6">9米6</Option>-->
                <!--                    <Option value="13米5">13米5</Option>-->
                <!--                    <Option value="零担">零担</Option>-->
                <!--                    <Option value="其他">其他</Option>-->
                <!--                    -->
                <!--                </Select>-->
                <RadioGroup v-model="formValidate.lorry">
                    <Radio label="6米8">6米8</Radio>
                    <Radio label="9米6">9米6</Radio>
                    <Radio label="13米5">13米5</Radio>
                    <Radio label="零担">零担</Radio>
                    <Radio label="其他">其他</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="餐厅类型" prop="store_type">
                <RadioGroup v-model="formValidate.store_type">
                    <Radio label="新店">新店</Radio>
                    <Radio label="麦咖啡">麦咖啡</Radio>
                    <Radio label="甜品站">甜品站</Radio>
                    <Radio label="MDS">MDS</Radio>
                    <Radio label="其他">其他</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="状态" prop="status">
                <Select v-model="formValidate.status" placeholder="选择状态">
                    <Option value="未配货">未配货</Option>
                    <Option value="配货中">配货中</Option>
                    <Option value="已配货">已配货</Option>
                    <Option value="已发货">已发货</Option>
                </Select>
            </FormItem>
            <FormItem label="到店日期">
                <Row>
                    <Col span="11">
                        <FormItem prop="arrive_date">
                            <DatePicker type="date" placeholder="到店日期"
                                        v-model="formValidate.arrive_date"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="发货日期">
                <Row>
                    <Col span="11">
                        <FormItem prop="ship_date">
                            <DatePicker type="date" placeholder="发货日期"
                                        v-model="formValidate.ship_date"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <!--            新增-->
            <FormItem label="配货时间">
                <Row>
                    <Col span="11">
                        <FormItem prop="pick_date">
                            <DatePicker type="date" placeholder="发货日期"
                                        v-model="formValidate.pick_date"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="备注信息" prop="comment">
                <Input v-model="formValidate.comment" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                       placeholder="备注信息"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit()">提交</Button>
                <Button v-show="actionType===1?true:false" @click="handleReset('formValidate')"
                        style="margin-left: 8px">重置
                </Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "form",
        methods: {
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleSubmit () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('logistics/addLogistics', this.formValidate).then(resp => {
                            this.$emit('closeModal')
                        }).catch(err => {
                            console.log(err)
                        })
                    } else {
                        this.$Message.error("请检查填写项目")
                    }
                });
            }
        },
        data () {
            return {
                actionType: 1,
                formValidate: {
                    city: '',
                    store_name: '',
                    order_no: '',
                    lorry: '',
                    arrive_date: '',
                    ship_date: '',
                    status: '',
                    comment: '',
                    store_type: '',
                    pick_date: ''
                },
                ruleValidate: {
                    city: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    store_name: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    order_no: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    lorry: [
                        {required: true, message: '不能为空', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择一个状态', trigger: 'change'}
                    ],
                    arrive_date: [
                        {required: true, type: 'date', message: '到店日期必填', trigger: 'change'}
                    ],
                    ship_date: [
                        {required: true, type: 'date', message: '发货日期必填', trigger: 'change'}
                    ],
                    pick_date: [
                        {required: true, type: 'date', message: '配货日期必填', trigger: 'change'}
                    ],
                    comment: [
                        {required: false, message: '输入备注信息', trigger: 'blur'},
                        {type: 'string', trigger: 'blur'}
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wuliu-form {
        width: 400px;
    }
</style>
