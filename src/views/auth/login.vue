<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="handleSubmit"></login-form>
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
    import LoginForm from './loginform'

    export default {
        components: {
            LoginForm
        },
        methods: {

            handleSubmit ({userName, password}) {
                this.handleLogin({userName, password}).then(res => {
                    this.getUserInfo().then(res => {
                        this.$router.push({
                            name: this.$config.homeName
                        })
                    })
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .login {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        &-con {
            width: 300px;
            &-header {
                font-size: 16px;
                font-weight: 300;
                text-align: center;
                padding: 30px 0;
            }
        }

        .form-con {
            padding: 10px 0 0;
        }

        .login-tip {
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
</style>
