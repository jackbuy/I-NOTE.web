<template>
    <zone-layout>
        <user-avatar
            slot="header"
            :data="navList"
            :user="userInfo"
            :type="zoneType"
            :current-user-id="currentUserId"
            @doFollow="handleFollow">
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

        <zone-article-list
            slot="content"
            v-if="zoneType === 'article'"
            :type="zoneType"
            :user-id="userId"
            :current-user-id="currentUserId"
            @scroll="handleScroll">
        </zone-article-list>
        <zone-topic-list
            v-if="zoneType === 'topic'"
            slot="content"
            :type="zoneType"
            :user-id="userId"
            :current-user-id="currentUserId"
            @scroll="handleScroll">
        </zone-topic-list>
        <zone-comment-list
            v-if="zoneType === 'comment'"
            slot="content"
            :type="zoneType"
            :user-id="userId"
            :current-user-id="currentUserId"
            @scroll="handleScroll">
        </zone-comment-list>
        <zone-collect-list
            v-if="zoneType === 'collect'"
            slot="content"
            :type="zoneType"
            :user-id="userId"
            :current-user-id="currentUserId"
            @scroll="handleScroll">
        </zone-collect-list>
        <zone-follow-list
            v-if="zoneType === 'follow'"
            slot="content"
            :type="zoneType"
            :user-id="userId"
            :current-user-id="currentUserId"
            @scroll="handleScroll">
        </zone-follow-list>
        <zone-fans-list
            v-if="zoneType === 'fans'"
            slot="content"
            :type="zoneType"
            :user-id="userId"
            :current-user-id="currentUserId"
            @scroll="handleScroll">
        </zone-fans-list>
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
        // 关注
        handleFollow(followUserId) {
            api.followUser({ followUserId }).then(() => {
                this.userInfo.isFollow = !this.userInfo.isFollow;
            }).catch(() => {});
        }
    }
};
</script>
