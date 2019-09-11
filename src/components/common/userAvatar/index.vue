<template>
    <div class="user-avatar">
        <div class="side">
            <el-avatar v-if="user.avatar" :size="100" :src="userImg"></el-avatar>
            <el-avatar v-else :size="100"><i class="icon icon-yonghu"></i></el-avatar>
        </div>
        <div class="content">
            <div class="header">
                <div class="name">{{ username }}<i>{{ brief }}</i></div>
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
            </div>
            <div class="count">
                <div :class="{'active': type === 'article'}" class="list">
                    <div @click="handleZone('article')">
                        <!-- <div class="c">{{ articleCount }}</div> -->
                        <div>文章</div>
                    </div>
                </div>
                <div :class="{'active': type === 'topic'}" class="list">
                    <div @click="handleZone('topic')">
                        <!-- <div class="c">{{ topicCount }}</div> -->
                        <div>专题</div>
                    </div>
                </div>
                <div :class="{'active': type === 'collect'}" class="list">
                    <div @click="handleZone('collect')">
                        <!-- <div class="c">{{ collectCount }}</div> -->
                        <div>收藏</div>
                    </div>
                </div>
                <div :class="{'active': type === 'follow'}" class="list">
                    <div @click="handleZone('follow')">
                        <!-- <div class="c">{{ followCount }}</div> -->
                        <div>关注</div>
                    </div>
                </div>
                <div :class="{'active': type === 'fans'}" class="list">
                    <div @click="handleZone('fans')">
                        <!-- <div class="c">{{ fansCount }}</div> -->
                        <div>粉丝</div>
                    </div>
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
        articleCount() {
            return this.user.articleCount || 0;
        },
        topicCount() {
            return this.user.topicCount || 0;
        },
        followCount() {
            return this.user.followCount || 0;
        },
        collectCount() {
            return this.user.collectCount || 0;
        },
        fansCount() {
            return this.user.fansCount || 0;
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

<style lang="less">
    @import './index.less';
</style>
