<template>
    <div class="login">
        <div class="header">已有账号？ <span @click="goLoginModal">登录</span></div>
        <el-form
            ref="form"
            :model="form"
            :rules="rules">
            <el-form-item
                prop="nickname">
                <el-input
                    v-model="form.nickname"
                    prefix-icon="el-icon-user"
                    placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item
                prop="email">
                <el-input
                    v-model="form.email"
                    prefix-icon="el-icon-message"
                    placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item
                prop="captcha">
                <el-input
                    v-model="form.captcha"
                    prefix-icon="el-icon-lock"
                    placeholder="验证码">
                    <el-button
                        slot="append"
                        :disabled="sending"
                        @click="handleSendEmail">{{ btntxt }}</el-button>
                </el-input>
            </el-form-item>
            <el-form-item
                prop="password">
                <el-input
                    v-model="form.password"
                    prefix-icon="el-icon-lock"
                    type="password"
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    :loading="loading"
                    class="submit"
                    type="primary"
                    native-type="submit"
                    @click="handRegister">
                    注册
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { TOGGLE_LOGIN_MODAL } from '@/store/mutation-types';
import api from '@/utils/api';
import message from '@/mixins/message';
export default {
    name: 'RegisterModal',
    mixins: [ message ],
    data() {
        const emailValue = (rule, value, callback) => {
            const regEmail = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z]{2,5}$/;
            if (value && (!(regEmail).test(value))) {
                callback(new Error('邮箱格式错误'));
            } else {
                callback();
            }
        };
        // const passwordValue = (rule, value, callback) => {
        //     const regPassword = /^[a-zA-Z]\w{5,17}$/;
        //     if (value && (!(regPassword).test(value))) {
        //         callback(new Error('以字母开头，长度在6~18之间，只能包含字母、数字和下划线'));
        //     } else {
        //         callback();
        //     }
        // };
        return {
            loading: false,
            time: 0,
            btntxt: '获取验证码',
            sending: false,
            form: {},
            rules: {
                nickname: [
                    { required: true, message: '必填' },
                    { min: 2, max: 20, message: '昵称长度在2~20之间' }
                ],
                email: [
                    { required: true, message: '必填' },
                    { validator: emailValue }
                ],
                captcha: [
                    { required: true, message: '必填' },
                    { max: 6, message: '验证码无效' }
                ],
                password: [
                    { required: true, message: '必填' },
                    { min: 6, max: 18, message: '密码长度在6~18之间' }
                    // { validator: passwordValue }
                ]
            }
        };
    },
    methods: {
        ...mapMutations({
            toggleLoginModal: TOGGLE_LOGIN_MODAL
        }),
        goLoginModal() {
            this.toggleLoginModal({
                open: true,
                type: 'login'
            });
        },
        handRegister() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    api.userRegister({ ...this.form }).then(() => {
                        const { email, password } = this.form;
                        this.userLogin({
                            email,
                            password
                        });
                    }).catch(() => {
                        this.loading = false;
                    });
                }
            });
        },
        handleSendEmail() {
            const { email } = this.form;
            const regEmail = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z]{2,5}$/;
            if (!this.sending) {
                if (email) {
                    if (regEmail.test(email)) {
                        this.btntxt = '发送中...';
                        this.sending = true;
                        api.sendRegisterEmail({ email }).then((res) => {
                            this.time = 60;
                            this.timer();
                        }).catch(() => {
                            this.sending = false;
                            this.btntxt = '获取验证码';
                        });
                    } else {
                        this.showWarningMsg('邮箱格式不正确！');
                    }
                } else {
                    this.showWarningMsg('请输入邮箱！');
                }
            }
        },
        userLogin(params) {
            this.loading = true;
            api.userLogin(params).then((res) => {
                const { token } = res.data;
                localStorage.setItem('token', token);
                window.location.reload();
            }).catch(() => {
                this.loading = false;
            });
        },
        timer() {
            if (this.time > 0) {
                this.time--;
                this.btntxt = '发送成功(' + this.time + 's)';
                setTimeout(this.timer, 1000);
            } else {
                this.time = 0;
                this.btntxt = '获取验证码';
                this.sending = false;
            }
        }
    }
};
</script>
