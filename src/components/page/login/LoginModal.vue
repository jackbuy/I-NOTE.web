<template>
    <div class="login">
        <div class="header">没有账号？ <span @click="goRegisterModal">注册</span></div>
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
                    @click="handleLogin">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
        <div class="header"><span @click="handleForgetModal">忘记密码？</span></div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { TOGGLE_LOGIN_MODAL } from '@/store/mutation-types';
import api from '@/utils/api';
export default {
    name: 'LoginModal',
    data() {
        return {
            loading: false,
            form: {},
            rules: {
                email: [
                    { required: true, message: '必填' }
                ],
                password: [
                    { required: true, message: '必填' }
                ]
            }
        };
    },
    methods: {
        ...mapMutations({
            toggleLoginModal: TOGGLE_LOGIN_MODAL
        }),
        goRegisterModal() {
            this.toggleLoginModal({
                open: true,
                type: 'register'
            });
        },
        handleForgetModal() {
            this.toggleLoginModal({
                open: true,
                type: 'forget'
            });
        },
        handleLogin() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.userLogin({ ...this.form });
                }
            });
        },
        userLogin(params) {
            this.loading = true;
            api.userLogin(params).then((res) => {
                const { token, userId } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                window.location.reload();
            }).catch(() => {
                this.loading = false;
            });
        }
    }
};
</script>
