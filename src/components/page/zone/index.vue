<template>
    <zone-layout>
        <user-avatar
            slot="header"
            :data="navList"
            :user="userInfo"
            :type="zoneType"
            :current-user-id="currentUserId"
            @doFollow="handleFollow"
            @doLetter="handleLetter">
        </user-avatar>
        <user-avatar
            v-if="isFixed"
            slot="header"
            :data="navList"
            :user="userInfo"
            :type="zoneType"
            :is-simple="true"
            :is-fixed="isFixed">
        </user-avatar>

        <component
            slot="content"
            :is="currentComponent"
            :type="zoneType"
            :user-id="userId"
            :current-user-id="currentUserId"
            @scroll="handleScroll">
        </component>

    </zone-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import ZoneLayout from './Layout';
import ZoneArticleList from './ZoneArticleList';
import ZoneCommentList from './ZoneCommentList';
import ZoneCollectList from './ZoneCollectList';
import ZoneTopicList from './ZoneTopicList';
import ZoneFollowList from './ZoneFollowList';
import ZoneFansList from './ZoneFansList';
import UserAvatar from '@/components/common/userAvatar';
import api from '@/utils/api';
export default {
    name: 'Zone',
    components: {
        ZoneLayout,
        ZoneArticleList,
        ZoneCommentList,
        ZoneTopicList,
        ZoneCollectList,
        ZoneFollowList,
        ZoneFansList,
        UserAvatar
    },
    data() {
        return {
            userInfo: {},
            isFixed: false,
            currentComponent: 'ZoneArticleList',
            navList: [
                // {
                //     name: '动态',
                //     type: 'active'
                // },
                {
                    name: '文章',
                    type: 'article'
                },
                {
                    name: '专题',
                    type: 'topic'
                },
                {
                    name: '评论',
                    type: 'comment'
                },
                {
                    name: '收藏',
                    type: 'collect'
                },
                {
                    name: '关注',
                    type: 'follow'
                },
                {
                    name: '粉丝',
                    type: 'fans'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            currentUserId: 'currentUserId'
        }),
        zoneType() {
            return this.$route.params.zoneType;
        },
        userId() {
            return this.$route.params.userId;
        },
        zone() {
            return `${this.zoneType}${this.userId}`;
        }
    },
    watch: {
        userId: {
            handler(n, o) {
                this.getZoneUserInfo(n);
            },
            immediate: true
        },
        zoneType: {
            handler(n, o) {
                if (n === o) return;
                if (n === 'article') this.currentComponent = 'ZoneArticleList';
                if (n === 'comment') this.currentComponent = 'ZoneCommentList';
                if (n === 'topic') this.currentComponent = 'ZoneTopicList';
                if (n === 'follow') this.currentComponent = 'ZoneFollowList';
                if (n === 'collect') this.currentComponent = 'ZoneCollectList';
                if (n === 'fans') this.currentComponent = 'ZoneFansList';
            },
            immediate: true
        }
    },
    methods: {
        handleScroll(val) {
            if (val > 267) {
                this.isFixed = true;
            } else {
                this.isFixed = false;
            }
        },
        // 用户信息
        getZoneUserInfo(followUserId) {
            const params = {
                userId: this.currentUserId,
                followUserId
            };
            api.getZoneUserInfo(params).then((res) => {
                this.userInfo = res.data;
            }).catch(() => {});
        },
        // 私信
        handleLetter(toUserId) {
            api.letterUserAdd(toUserId).then((res) => {
                const { _id } = res.data;
                this.$router.push(`/letter/${_id}`).catch(() => {});
            }).catch(() => {});
        },
        // 关注
        handleFollow(followUserId) {
            api.followUser({ followUserId }).then(() => {
                this.userInfo.isFollow = !this.userInfo.isFollow;
            }).catch(() => {});
        }
    }
};
</script>
