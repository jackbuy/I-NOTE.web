<template>
    <modal
        :title="modalTitle"
        :visible="modalVisible"
        @submit.native.prevent
        @handleClose="handleCloseModal">
        <login-modal v-if="modalType === 'login'"></login-modal>
        <register-modal v-if="modalType === 'register'"></register-modal>
        <forget-modal v-if="modalType === 'forget'"></forget-modal>
    </modal>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { TOGGLE_LOGIN_MODAL } from '@/store/mutation-types';
import Modal from '@/components/common/modal';
import LoginModal from './LoginModal';
import ForgetModal from './ForgetModal';
import RegisterModal from './RegisterModal';
import api from '@/utils/api';
export default {
    name: 'Login',
    components: {
        Modal,
        LoginModal,
        RegisterModal,
        ForgetModal
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
            if (this.modalType === 'login') return '登录';
            if (this.modalType === 'register') return '新用户注册';
            if (this.modalType === 'forget') return '忘记密码';
        }
    },
    data() {
        return {};
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
                const { token } = res.data;
                localStorage.setItem('token', token);
                window.location.reload();
            });
        },
        handleSendEmail() {
            api.sendEmail().then((res) => {
                // console.log(res);
            });
        }
    }
};
</script>
