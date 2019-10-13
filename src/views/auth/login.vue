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
    import LoginForm from '@/components/login/form'

    export default {
        data () {
            return {
                loading: false
            }
        },
        components: {
            LoginForm
        },
        methods: {
            handleSubmit ({username, password}) {
                this.$store.dispatch('auth/login', {username, password}).then(resp => {
                    // eslint-disable-next-line no-console
                    this.$router.push({path: this.redirect || '/', query: this.otherQuery})
                    this.loading = false
                }).catch(error => {
                    // eslint-disable-next-line no-console
                    console.log(error)
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .login {
        width: 100%;
        height: calc(100vh);
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;

        &-con {
            width: 400px;
            height: 300px;

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
