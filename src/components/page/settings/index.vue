<template>
    <div class="settings">
        <card title="头像">
            <set-avatar
                :prop="userInfo.avatar"
                :loading="loading"
                label="avatar"
                @submit="handleSave">
            </set-avatar>
        </card>
        <card title="昵称">
            <set-input
                :prop="userInfo.nickname"
                :loading="loading"
                placeholder="请输入昵称"
                label="nickname"
                @submit="handleSave">
            </set-input>
        </card>
        <card title="简介">
            <set-input
                :prop="userInfo.brief"
                :loading="loading"
                placeholder="请输入简介"
                label="brief"
                @submit="handleSave">
            </set-input>
        </card>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { GET_USER_INFO } from '@/store/mutation-types';
import SetAvatar from './SetAvatar';
import SetInput from './SetInput';
import Card from '@/components/common/card';
import api from '@/utils/api';
export default {
    name: 'TopicAddEdit',
    components: {
        Card,
        SetInput,
        SetAvatar
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
