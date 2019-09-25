<template>
    <div class="user-info">
        <div class="img">
            <el-avatar v-if="user.avatar" :size="80" :src="userImg"></el-avatar>
            <el-avatar v-else :size="80"><i class="icon icon-yonghu"></i></el-avatar>
        </div>
        <div class="name" @click="handleZone('article')">
            <strong >{{ username }}</strong>
        </div>
        <div class="brief">
            {{ brief }}
        </div>
        <div class="menu">
            <span
                v-if="userId !== mine"
                :class="{'active': isFollow}"
                @click="handleFollow(userId)">
                <i v-if="!isFollow">关注</i>
                <i v-else>已关注</i>
            </span>
        </div>
        <div class="count">
            <div class="list" @click="handleZone('article')">
                <div class="c">{{ articleCount }}</div>
                <div>文章</div>
            </div>
            <div class="list" @click="handleZone('topic')">
                <div class="c">{{ topicCount }}</div>
                <div>专题</div>
            </div>
            <div class="list" @click="handleZone('follow')">
                <div class="c">{{ followCount }}</div>
                <div>关注</div>
            </div>
            <div class="list" @click="handleZone('fans')">
                <div class="c">{{ fansCount }}</div>
                <div>粉丝</div>
            </div>
        </div>
        <slot></slot>
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
        }
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
        articleCount() {
            return this.user.articleCount;
        },
        topicCount() {
            return this.user.topicCount;
        },
        followCount() {
            return this.user.followCount;
        },
        fansCount() {
            return this.user.fansCount;
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
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
