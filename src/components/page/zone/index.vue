<template>
    <zone-layout>
        <user-avatar
            :user="userInfo"
            :type="zoneType"
            slot="header"
            @doFollow="handleFollow">
        </user-avatar>
        <zone-article-list
            v-if="zoneType === 'article' || zoneType === 'draft'"
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
        <zone-follow-user-list
            v-if="zoneType === 'follow'"
            :type="zoneType"
            :user-id="userId"
            slot="content">
        </zone-follow-user-list>
        <zone-fans-list
            v-if="zoneType === 'fans'"
            :type="zoneType"
            :user-id="userId"
            slot="content">
        </zone-fans-list>
    </zone-layout>
</template>

<script>
import ZoneLayout from './Layout';
import ZoneArticleList from './ZoneArticleList';
import ZoneCollectList from './ZoneCollectList';
import ZoneTopicList from './ZoneTopicList';
import ZoneFollowUserList from './ZoneFollowUserList';
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
        ZoneFollowUserList,
        ZoneFansList,
        UserAvatar
    },
    data() {
        return {
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
            return localStorage.getItem('userId');
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
        getZoneUserInfo(followId) {
            const params = {
                userId: this.currentUserId || '',
                followId
            };
            api.getZoneUserInfo(params).then((res) => {
                this.userInfo = res.data;
            });
        },
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
