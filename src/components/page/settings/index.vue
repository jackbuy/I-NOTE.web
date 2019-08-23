<template>
    <div class="settings">
        <set-item title="昵称">
            <set-input
                :prop="userInfo.nickname"
                :loading="loading"
                placeholder="请输入昵称"
                label="nickname"
                @submit="handleSave">
            </set-input>
        </set-item>
        <set-item title="简介">
            <set-input
                :prop="userInfo.brief"
                :loading="loading"
                placeholder="请输入简介"
                label="brief"
                @submit="handleSave">
            </set-input>
        </set-item>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { GET_USER_INFO } from '@/store/mutation-types';
import SetInput from './SetInput';
import SetItem from './SetItem';
import api from '@/utils/api';
export default {
    name: 'TopicAddEdit',
    components: {
        SetInput,
        SetItem
    },
    data() {
        return {
            loading: false
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.userInfo
        })
    },
    methods: {
        ...mapActions({
            getUserInfo: GET_USER_INFO
        }),
        handleSave(value) {
            this.loading = true;
            const params = Object.assign({}, this.userInfo, value);
            api.userInfoEdit(params).then(() => {
                this.getUserInfo();
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        }
    }
};
</script>

<style lang="less">
@import './layout.less';
</style>
