<template>
    <div class="login">
        <div class="header">已有账号？ <span @click="goLoginModal">登录</span></div>
        <el-form
            ref="form"
            :model="form"
            :rules="rules">
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
                    placeholder="新密码"></el-input>
            </el-form-item>
            <el-form-item
                prop="passwordRepeat">
                <el-input
                    v-model="form.passwordRepeat"
                    prefix-icon="el-icon-lock"
                    type="password"
                    placeholder="重复新密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    :loading="loading"
                    class="submit"
                    type="primary"
                    native-type="submit"
                    @click="handForget">
                    提交
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
    name: 'ForgetModal',
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
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.form.passwordRepeat !== '') {
                    this.$refs.form.validateField('passwordRepeat');
                }
                callback();
            }
        };
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            time: 0,
            btntxt: '获取验证码',
            sending: false,
            form: {},
            rules: {
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
                    { min: 6, max: 18, message: '密码长度在6~18之间' },
                    { validator: validatePass }
                ],
                passwordRepeat: [
                    { required: true, message: '必填' },
                    { min: 6, max: 18, message: '密码长度在6~18之间' },
                    { validator: validatePass2 }
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
        handForget() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    const { password, email, captcha } = this.form;
                    const params = {
                        password,
                        email,
                        captcha
                    };
                    api.userForget(params).then(() => {
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
                        api.sendForgetEmail({ email }).then((res) => {
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
