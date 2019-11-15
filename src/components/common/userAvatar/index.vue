<template>
    <div class="user-avatar" :class="{'simple': isSimple, 'fixed': isFixed}">
        <div v-if="!isSimple" class="side">
            <el-avatar v-if="user.avatar" :size="avatarSize" :src="userImg"></el-avatar>
            <el-avatar v-else :size="avatarSize"><i class="icon icon-yonghu"></i></el-avatar>
        </div>
        <div class="content">
            <div v-if="!isSimple" class="header">
                <div class="name">{{ username }}</div>
                <div class="brief">{{ brief }}</div>
                <div class="time">{{ time }}</div>
            </div>
            <div v-if="!isSimple" class="menu">
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
                    <i class="icon icon-settings-o"></i>
                </span>
            </div>
            <div class="nav">
                <div
                    v-for="item in data"
                    :key="item.type"
                    :class="{'active': type === item.type}">
                    <div @click="handleZone(item.type)">
                        {{ item.name }}
                    </div>
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
        data: {
            type: Array,
            default: () => []
        },
        currentUserId: String,
        type: String,
        isSimple: Boolean,
        isFixed: Boolean
    },
    data() {
        return {
            avatarSize: 106
        };
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
