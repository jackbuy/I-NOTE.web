<template>
    <div>
        <div>已有账号？ <span @click="goLoginModal">登录</span></div>
        <el-form
            ref="form"
            :model="form"
            :rules="rules">
            <el-form-item
                prop="username">
                <el-input
                    v-model="form.nickname"
                    prefix-icon="el-icon-user"
                    placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item
                prop="password">
                <el-input
                    v-model="form.email"
                    prefix-icon="el-icon-lock"
                    placeholder="邮箱"></el-input>
            </el-form-item>
            <el-form-item
                prop="passwordRepeat">
                <el-input
                    v-model="form.captcha"
                    prefix-icon="el-icon-lock"
                    placeholder="验证码">
                    <el-button slot="append" @click="handleSendEmail">获取验证码</el-button>
                </el-input>
            </el-form-item>
            <el-form-item
                prop="passwordRepeat">
                <el-input
                    v-model="form.password"
                    prefix-icon="el-icon-lock"
                    type="password"
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
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
        goLoginModal() {
            this.toggleLoginModal({
                open: true,
                type: 'login'
            });
        },
        handRegister() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    api.userRegister({ ...this.form }).then(() => {
                        // this.userLogin(params);
                        alert('suc');
                    });
                }
            });
        },
        handleSendEmail() {
            const { email } = this.form;
            if (email) {
                api.sendEmail({ email }).then((res) => {
                    console.log(res);
                });
            }
        }
    }
};
</script>
