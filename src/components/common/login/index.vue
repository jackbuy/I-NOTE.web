<template>
    <modal
        :title="modalTitle"
        :visible="modalVisible"
        @handleClose="handleCloseModal">
        <el-form
            ref="user"
            :model="user"
            :rules="rules">
            <el-form-item
                prop="username">
                <el-input
                    v-model.trim="user.username"
                    type="text"
                    placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item
                prop="password">
                <el-input
                    v-model.trim="user.password"
                    type="password"
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item
                v-if="modalType==='register'"
                prop="password">
                <el-input
                    v-model.trim="user.password2"
                    type="password"
                    placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    v-if="modalType==='login'"
                    @click="handleLogin">登录</el-button>
                <el-button
                    v-if="modalType==='register'"
                    @click="handRegister">注册</el-button>
            </el-form-item>
        </el-form>
    </modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { TOGGLE_LOGIN_MODAL, IS_LOGIN } from '@/store/mutation-types';
import Modal from '@/components/common/modal/Modal';
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
            return this.loginModal.type === 'login' ? '登录' : '注册';
        }
    },
    data() {
        return {
            user: {},
            rules: {
                username: [
                    {
                        required: true, message: '账号不能为空！'
                    }
                ],
                password: [
                    {
                        required: true, message: '密码不能为空！'
                    }
                ]
            }
        };
    },
    methods: {
        ...mapMutations({
            toggleLoginModal: TOGGLE_LOGIN_MODAL,
            isLogin: IS_LOGIN
        }),
        handRegister() {
            this.$refs.user.validate((valid) => {
                if (valid) {
                    const { username, password } = this.user;
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
            this.$refs.user.validate((valid) => {
                if (valid) {
                    const { username, password } = this.user;
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
        },
        userLogin(params) {
            api.userLogin(params).then((res) => {
                const { token, userMsg } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userMsg', JSON.stringify(userMsg));
                window.location.reload();
            });
        }
    }
};
</script>
