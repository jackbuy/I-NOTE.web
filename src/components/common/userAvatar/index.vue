<template>
    <div class="user-avatar">
        <div class="side">
            <el-avatar :size="100">{{ userImg }}</el-avatar>
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
                    <span class="default" @click="handleSettings()"><i class="el-icon-s-tools"></i></span>
                </div>
            </div>
            <div class="count">
                <!-- <div :class="{'active': type === 'active'}" class="list" @click="handleZone('active')">
                    <div class="c">{{ articleCount }}</div>
                    <div>动态</div>
                </div> -->
                <div :class="{'active': type === 'article'}" class="list" @click="handleZone('article')">
                    <div class="c">{{ articleCount }}</div>
                    <div><i class="icon icon-wenzhang"></i>文章</div>
                </div>
                <div :class="{'active': type === 'collect'}" class="list" @click="handleZone('collect')">
                    <div class="c">{{ collectCount }}</div>
                    <div><i class="icon icon-like"></i>收藏</div>
                </div>
                <div :class="{'active': type === 'topic'}" class="list" @click="handleZone('topic')">
                    <div class="c">{{ topicCount }}</div>
                    <div><i class="icon icon-zhuanti"></i>专题</div>
                </div>
                <div :class="{'active': type === 'follow'}" class="list" @click="handleZone('follow')">
                    <div class="c">{{ followCount }}</div>
                    <div><i class="icon icon-guanzhu"></i>关注</div>
                </div>
                <div :class="{'active': type === 'fans'}" class="list" @click="handleZone('fans')">
                    <div class="c">{{ fansCount }}</div>
                    <div><i class="icon icon-fensi"></i>粉丝</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
            return this.user.articleCount;
        },
        topicCount() {
            return this.user.topicCount;
        },
        followCount() {
            return this.user.followCount;
        },
        collectCount() {
            return this.user.collectCount;
        },
        fansCount() {
            return this.user.fansCount;
        },
        userImg() {
            if (this.username) return this.username.split('')[0].toUpperCase();
        }
    },
    methods: {
        handleFollow(followUserId) {
            this.$emit('doFollow', followUserId);
        },
        handleZone(type) {
            this.$router.push(`/zone/${this.userId}/${type}`);
        },
        handleSettings() {
            this.$router.push(`/settings`);
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
