<template>
    <modal
        :title="modalTitle"
        :visible="modalVisible"
        @submit.native.prevent
        @handleClose="handleCloseModal">
        <el-form
            v-if="modalType==='login'"
            ref="loginForm"
            :model="loginForm"
            :rules="rulesLoginForm">
            <el-form-item prop="username">
                <el-input
                    v-model="loginForm.username"
                    prefix-icon="el-icon-user"
                    type="text"
                    placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="loginForm.password"
                    prefix-icon="el-icon-lock"
                    type="password"
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    native-type="submit"
                    @click="handleLogin">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
        <el-form
            v-if="modalType==='register'"
            ref="form"
            :model="form"
            :rules="rules">
            <el-form-item
                prop="username">
                <el-input
                    v-model="form.username"
                    prefix-icon="el-icon-user"
                    type="text"
                    placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item
                prop="password">
                <el-input
                    v-model="form.password"
                    prefix-icon="el-icon-lock"
                    type="password"
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item
                prop="passwordRepeat">
                <el-input
                    v-model="form.passwordRepeat"
                    prefix-icon="el-icon-lock"
                    type="password"
                    placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    native-type="submit"
                    @click="handRegister">
                    注册
                </el-button>
                <!-- <el-button
                    native-type="submit"
                    @click="handleSendEmail">
                    发送邮件
                </el-button> -->
            </el-form-item>
        </el-form>
    </modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { TOGGLE_LOGIN_MODAL } from '@/store/mutation-types';
import Modal from '@/components/common/modal';
import api from '@/utils/api';
export default {
    name: 'Login',
    components: {
        Modal
    },
    computed: {
        ...mapState({
            loginModal: state => state.loginModal
        }),
        modalVisible() {
            return this.loginModal.open;
        },
        modalType() {
            return this.loginModal.type;
        },
        modalTitle() {
            if (this.modalType === 'login') return '用户登录';
            if (this.modalType === 'register') return '新用户注册';
        }
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value !== '') {
                if (this.form.passwordRepeat !== '') {
                    this.$refs.form.validateField('passwordRepeat');
                }
                callback();
            } else {
                callback(new Error('密码不能为空！'));
            }
        };
        const validatePass2 = (rule, value, callback) => {
            if (value !== '') {
                if (value !== this.form.password) {
                    callback(new Error('两次密码输入不一致！'));
                } else {
                    callback();
                }
            } else {
                callback(new Error('请再次输入密码！'));
            }
        };
        return {
            form: {
                username: '',
                password: '',
                passwordRepeat: ''
            },
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    {
                        required: true, message: '账号不能为空！'
                    }
                ],
                password: [
                    { required: true, validator: validatePass },
                    { min: 6, max: 12, message: '密码长度 6-12' }
                ],
                passwordRepeat: [
                    { required: true, validator: validatePass2 },
                    { min: 6, max: 12, message: '密码长度 6-12' }
                ]
            },
            rulesLoginForm: {
                username: [
                    {
                        required: true, message: '账号不能为空！'
                    }
                ],
                password: [
                    { required: true, message: '账号不能为空！' }
                ]
            }
        };
    },
    methods: {
        ...mapMutations({
            toggleLoginModal: TOGGLE_LOGIN_MODAL
        }),
        handRegister() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    const { username, password } = this.form;
                    const params = {
                        username,
                        password
                    };
                    api.userRegister(params).then(() => {
                        this.userLogin(params);
                    });
                }
            });
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    const { username, password } = this.loginForm;
                    const params = {
                        username,
                        password
                    };
                    this.userLogin(params);
                }
            });
        },
        handleCloseModal() {
            this.toggleLoginModal(false);
            if (this.$refs.form) this.$refs.form.resetFields();
            if (this.$refs.loginForm) this.$refs.loginForm.resetFields();
        },
        userLogin(params) {
            api.userLogin(params).then((res) => {
                const { token, userId } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                window.location.reload();
            });
        },
        handleSendEmail() {
            api.sendEmail().then((res) => {
                console.log(res);
            });
        }
    }
};
</script>
