<template>
    <common-layout>
        <div class="top">
            <div class="header">
                <img alt="logo" class="logo" src="@/assets/img/logo.png"/>
                <span class="title">{{systemName}}</span>
            </div>
            <div class="desc">Dang nhap vao trang quan tri cua TechHost</div>
        </div>
        <div class="login">
            <ValidationObserver ref="observer" v-slot="{ passes }">
                <a-form id="components-form-demo-normal-login" class="login-form">
                    <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
                        <a-tab-pane tab="Dang nhap" key="1">
                            <InputWithValidation
                                    v-model="inputData.email"
                                    rules="required|email"
                                    v-bind:name="$t('login.email')"
                                    icon="user"
                                    :placeholder="$t('login.email_placeholder')"
                            />
                            <InputWithValidation
                                    v-model="inputData.password"
                                    type="password"
                                    rules="required"
                                    v-bind:name="$t('login.password')"
                                    icon="lock"
                                    :placeholder="$t('login.password_placeholder')"
                                    vid="password"
                            />
                            <div>
                                <a-checkbox :checked="true">Remember me</a-checkbox>
                                <a style="float: right">Quen mat khau</a>
                            </div>
                            <a-form-item>
                                <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit"
                                          type="primary" @click="passes(submit)">{{ $t('login.login_button') }}
                                </a-button>
                            </a-form-item>
                        </a-tab-pane>
                        <a-tab-pane tab="Quen mat khau" key="2">
                        </a-tab-pane>
                    </a-tabs>
                </a-form>
            </ValidationObserver>
        </div>
    </common-layout>
</template>

<script>
    import CommonLayout from '@/layouts/CommonLayout'
    import {mapActions} from 'vuex'
    import InputWithValidation from '../../components/shared/InputWithValidation'
    import store from '../../store'

    export default {
        name: 'Login',
        components: {
            CommonLayout,
            InputWithValidation,
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'normal_login'});
        },
        data() {
            return {
                inputData: {
                    email: null,
                    password: null,
                },
                logging: false,
            }
        },
        computed: {
            systemName() {
                return this.$store.state.setting.systemName
            }
        },
        methods: {
            ...mapActions('auth', ['login', 'checkAuth']),

            async submit() {
                let data = {...this.inputData}
                console.log(data)
                this.logging = true

                try {
                    await this.login(data).then((res) => {
                        this.logging = false
                        store.dispatch('auth/checkAuth')
                        const name = res.typeAuth === 'SUPER_ADMIN' ? 'AdminDashboard' : 'AccountDashboard'
                        this.$router.push({name: name})
                    })
                } catch (e) {
                    this.logging = false
                    this.$message.error(e.response.data.error.message)
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .common-layout {
        .top {
            text-align: center;

            .header {
                height: 44px;
                line-height: 44px;

                a {
                    text-decoration: none;
                }

                .logo {
                    height: 44px;
                    vertical-align: top;
                    margin-right: 16px;
                }

                .title {
                    font-size: 33px;
                    color: rgba(0, 0, 0, .85);
                    font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
                    font-weight: 600;
                    position: relative;
                    top: 2px;
                }
            }

            .desc {
                font-size: 14px;
                color: rgba(0, 0, 0, .45);
                margin-top: 12px;
                margin-bottom: 40px;
            }
        }

        .login {
            width: 368px;
            margin: 0 auto;
            @media screen and (max-width: 576px) {
                width: 95%;
            }
            @media screen and (max-width: 320px) {
                .captcha-button {
                    font-size: 14px;
                }
            }

            .icon {
                font-size: 24px;
                color: rgba(0, 0, 0, 0.2);
                margin-left: 16px;
                vertical-align: middle;
                cursor: pointer;
                transition: color 0.3s;

                &:hover {
                    color: @primary-color;
                }
            }
        }
    }
</style>
