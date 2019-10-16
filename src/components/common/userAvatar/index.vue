<template>
    <div class="user-avatar">
        <div class="side">
            <el-avatar v-if="user.avatar" :size="100" :src="userImg"></el-avatar>
            <el-avatar v-else :size="100"><i class="icon icon-yonghu"></i></el-avatar>
        </div>
        <div class="content">
            <div class="header">
                <div class="name">{{ username }}</div>
                <div class="brief">{{ brief }}</div>
                <div class="time">{{ time }}</div>
            </div>
            <div class="menu">
                <span
                    v-if="userId !== currentUserId"
                    :class="{'active': isFollow}"
                    @click="handleFollow(userId)">
                    <i v-if="!isFollow">关注</i>
                    <i v-else>已关注</i>
                </span>
                <span
                    v-if="userId === currentUserId"
                    class="default"
                    @click="handleSettings()">
                    <i class="icon icon-settings"></i>
                </span>
            </div>
            <div class="nav">
                <div :class="{'active': type === 'article'}">
                    <div @click="handleZone('article')">文章</div>
                </div>
                <div :class="{'active': type === 'topic'}">
                    <div @click="handleZone('topic')">专题</div>
                </div>
                <div :class="{'active': type === 'collect'}">
                    <div @click="handleZone('collect')">收藏</div>
                </div>
                <div :class="{'active': type === 'follow'}">
                    <div @click="handleZone('follow')">关注</div>
                </div>
                <div :class="{'active': type === 'fans'}">
                    <div @click="handleZone('fans')">粉丝</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { imgBaseUrl } from '@/constants/url-config';
import utils from '@/utils/utils';
export default {
    name: 'UserAvatar',
    props: {
        user: {
            type: Object,
            default: () => {}
        },
        currentUserId: String,
        type: String
    },
    computed: {
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
        time() {
            return `加入于 ${utils.formatDate.date(this.user.createTime)}`;
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
