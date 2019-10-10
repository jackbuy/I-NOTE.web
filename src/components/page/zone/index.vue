<template>
    <zone-layout>
        <user-avatar
            :user="userInfo"
            :type="zoneType"
            slot="header"
            @doFollow="handleFollow">
        </user-avatar>

        <card slot="content" :visible-header="true" :padding="false">
            <zone-article-list
                v-if="zoneType === 'article'"
                :type="zoneType"
                :user-id="userId">
            </zone-article-list>
            <zone-topic-list
                v-if="zoneType === 'topic'"
                :type="zoneType"
                :user-id="userId">
            </zone-topic-list>
            <zone-collect-list
                v-if="zoneType === 'collect'"
                :type="zoneType"
                :user-id="userId">
            </zone-collect-list>
            <zone-follow-list
                v-if="zoneType === 'follow'"
                :type="zoneType"
                :user-id="userId">
            </zone-follow-list>
            <zone-fans-list
                v-if="zoneType === 'fans'"
                :type="zoneType"
                :user-id="userId">
            </zone-fans-list>
        </card>
    </zone-layout>
</template>

<script>
import ZoneLayout from './Layout';
import ZoneArticleList from './ZoneArticleList';
import ZoneCollectList from './ZoneCollectList';
import ZoneTopicList from './ZoneTopicList';
import ZoneFollowList from './ZoneFollowList';
import ZoneFansList from './ZoneFansList';
import Card from '@/components/common/card';
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
        Card
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
