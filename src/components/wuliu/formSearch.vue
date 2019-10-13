<template>
    <div class="wuliu-form-search">

        <Form ref="formSearchValidate" :model="formSearchValidate" :label-width="80">
            <FormItem label="id" prop="id" hidden>
                <Input v-model="formSearchValidate.id" placeholder="id"></Input>
            </FormItem>
            <FormItem label="餐厅名称" prop="store_name">
                <Input v-model="formSearchValidate.store_name" placeholder="输入餐厅名称"></Input>
            </FormItem>
            <FormItem label="所在城市" prop="city">
                <Input v-model="formSearchValidate.city" placeholder="餐厅所在城市"></Input>
            </FormItem>
            <FormItem label="订单编码" prop="order_no">
                <Input v-model="formSearchValidate.order_no" placeholder="订单编码"></Input>
            </FormItem>
            <FormItem label="运输车型" prop="lorry">
                <RadioGroup v-model="formSearchValidate.lorry">
                    <Radio label="6米8">6米8</Radio>
                    <Radio label="9米6">9米6</Radio>
                    <Radio label="13米5">13米5</Radio>
                    <Radio label="零担">零担</Radio>
                    <Radio label="其他">其他</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="餐厅类型" prop="store_type">
                <RadioGroup v-model="formSearchValidate.store_type">
                    <Radio label="新店">新店</Radio>
                    <Radio label="麦咖啡">麦咖啡</Radio>
                    <Radio label="甜品站">甜品站</Radio>
                    <Radio label="MDS">MDS</Radio>
                    <Radio label="其他">其他</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="状态" prop="status">
                <Select v-model="formSearchValidate.status" placeholder="选择状态">
                    <Option value="未配货">未配货</Option>
                    <Option value="配货中">配货中</Option>
                    <Option value="已配货">已配货</Option>
                    <Option value="已发货">已发货</Option>
                </Select>
            </FormItem>
            <FormItem label="到店日期">
                <Row>
                    <Col span="11">
                        <FormItem prop="arrive_range">
                            <Row>
                                <DatePicker v-model="formSearchValidate.arrive_range"
                                            type="daterange" split-panels
                                            placeholder="Select date" style="width: 200px"></DatePicker>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="发货日期">
                <Row>
                    <Col span="11">
                        <FormItem prop="ship_range">
                            <Row>
                                <DatePicker v-model="formSearchValidate.ship_range" type="daterange" split-panels
                                            placeholder="Select date" style="width: 200px"></DatePicker>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem label="配货日期">
                <Row>
                    <Col span="11">
                        <FormItem prop="pick_range">
                            <Row>
                                <DatePicker v-model="formSearchValidate.pick_range" type="daterange" split-panels
                                            placeholder="Select date" style="width: 200px"></DatePicker>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSearch()">搜索</Button>
                <Button v-show="actionType===1?true:false" @click="handleReset('formSearchValidate')"
                        style="margin-left: 8px">重置
                </Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "formSearch",
        methods: {
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleSearch () {
                this.$store.dispatch('logistics/searchLogistics', this.formSearchValidate).then(resp => {
                    this.$emit('closeModal')
                }).catch(err => {
                    console.log(err)
                });
            }
        },
        data () {
            return {
                actionType: 1,
                formSearchValidate: {
                    city: '',
                    store_name: '',
                    order_no: '',
                    lorry: '',
                    arrive_range: '',
                    ship_range: '',
                    pick_range: '',
                    status: '',
                    comment: '',
                    store_type: ''
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
    .wuliu-form-search {
        width: 400px;
    }
</style>
