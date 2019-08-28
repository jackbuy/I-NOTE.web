<template>
    <container :is-not-find="isNotFind" :loading="loading" tips="作者不存在">
        <zone-layout>
            <user-avatar
                :user="userInfo"
                :type="zoneType"
                slot="header"
                @doFollow="handleFollow">
            </user-avatar>
            <zone-article-list
                v-if="zoneType === 'article'"
                :type="zoneType"
                :user-id="userId"
                slot="content">
            </zone-article-list>
            <zone-collect-list
                v-if="zoneType === 'collect'"
                :type="zoneType"
                :user-id="userId"
                slot="content">
            </zone-collect-list>
            <zone-topic-list
                v-if="zoneType === 'topic'"
                :type="zoneType"
                :user-id="userId"
                slot="content">
            </zone-topic-list>
            <zone-follow-list
                v-if="zoneType === 'follow'"
                :type="zoneType"
                :user-id="userId"
                slot="content">
            </zone-follow-list>
            <zone-fans-list
                v-if="zoneType === 'fans'"
                :type="zoneType"
                :user-id="userId"
                slot="content">
            </zone-fans-list>
        </zone-layout>
    </container>
</template>

<script>
import Container from '@/components/common/container';
import ZoneLayout from './Layout';
import ZoneArticleList from './ZoneArticleList';
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
        ZoneTopicList,
        ZoneCollectList,
        ZoneFollowList,
        ZoneFansList,
        UserAvatar,
        Container
    },
    data() {
        return {
            loading: false,
            isNotFind: false,
            userInfo: {}
        };
    },
    computed: {
        zoneType() {
            return this.$route.params.zoneType;
        },
        userId() {
            return this.$route.params.userId;
        },
        // 当前登录用户Id
        currentUserId() {
            return localStorage.getItem('userId') || '';
        },
        zone() {
            return `${this.type}${this.userId}`;
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
        // 用户信息
        getZoneUserInfo(followId) {
            const params = {
                userId: this.currentUserId,
                followId
            };
            this.loading = true;
            api.getZoneUserInfo(params).then((res) => {
                this.loading = false;
                this.isNotFind = false;
                this.userInfo = res.data;
            }).catch(() => {
                this.loading = false;
                this.isNotFind = true;
            });
        },
        // 关注
        handleFollow(followUserId) {
            const params = {
                followId: followUserId,
                type: 0
            };
            api.follow(params).then(() => {
                this.userInfo.isFollow = !this.userInfo.isFollow;
            }).catch(() => {});
        }
    }
};
</script>
