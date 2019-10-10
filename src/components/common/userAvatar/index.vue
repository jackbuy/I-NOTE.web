<template>
    <div class="user-avatar">
        <div class="side">
            <el-avatar v-if="user.avatar" :size="80" :src="userImg"></el-avatar>
            <el-avatar v-else :size="80"><i class="icon icon-yonghu"></i></el-avatar>
        </div>
        <div class="content">
            <div class="header">
                <div class="name">{{ username }}</div>
                <div class="brief">{{ brief }}</div>
            </div>
            <div class="menu">
                <span
                    v-if="userId !== mine"
                    :class="{'active': isFollow}"
                    @click="handleFollow(userId)">
                    <i v-if="!isFollow">关注</i>
                    <i v-else>已关注</i>
                </span>
                <span
                    v-if="userId === mine"
                    class="default"
                    @click="handleSettings()">
                    <i class="el-icon-s-tools"></i>
                </span>
            </div>
            <div class="count">
                <div :class="{'active': type === 'article'}" class="list">
                    <div @click="handleZone('article')">文章</div>
                </div>
                <div :class="{'active': type === 'topic'}" class="list">
                    <div @click="handleZone('topic')">专题</div>
                </div>
                <div :class="{'active': type === 'collect'}" class="list">
                    <div @click="handleZone('collect')">收藏</div>
                </div>
                <div :class="{'active': type === 'follow'}" class="list">
                    <div @click="handleZone('follow')">关注</div>
                </div>
                <div :class="{'active': type === 'fans'}" class="list">
                    <div @click="handleZone('fans')">粉丝</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { imgBaseUrl } from '@/constants/url-config';
export default {
    name: 'UserAvatar',
    props: {
        user: {
            type: Object,
            default: () => {}
        },
        type: String
    },
    computed: {
        mine() {
            return localStorage.getItem('userId');
        },
        userId() {
            return this.user._id;
        },
        username() {
            return this.user.nickname ? this.user.nickname : this.user.username;
        },
        isFollow() {
            return this.user.isFollow;
        },
        brief() {
            return this.user.brief || '作者很懒，什么也没写！';
        },
        userImg() {
            return this.user.avatar ? `${imgBaseUrl}/${this.user.avatar}` : '';
        }
    },
    methods: {
        handleFollow(followUserId) {
            this.$emit('doFollow', followUserId);
        },
        handleZone(type) {
            this.$router.push(`/zone/${this.userId}/${type}`).catch(() => {});
        },
        handleSettings() {
            this.$router.push(`/settings`).catch(() => {});
        }
    }
};
</script>
