<template>
    <div>
        <div>没有账号？ <span @click="goRegisterModal">注册</span></div>
        <el-form
            ref="form"
            :model="form"
            :rules="rules">
            <el-form-item
                prop="email">
                <el-input
                    v-model="form.email"
                    prefix-icon="el-icon-lock"
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
                    native-type="submit"
                    @click="handleLogin">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { TOGGLE_LOGIN_MODAL } from '@/store/mutation-types';
import api from '@/utils/api';
export default {
    name: '',
    data() {
        return {
            form: {},
            rules: {}
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
        handleLogin() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.userLogin({ ...this.form });
                }
            });
        },
        userLogin(params) {
            api.userLogin(params).then((res) => {
                const { token, userId } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                window.location.reload();
            });
        }
    }
};
</script>
