<template>
    <zone-layout>
        <user-avatar
            :user="userInfo"
            :follow="isFollow"
            slot="header"
            @doFollow="handleFollow">
            <div>
                {{ createTime }}
            </div>
        </user-avatar>
        <span
            v-for="item in headerTabData"
            :key="item.type"
            :class="{'active': articleType === item.type}"
            slot="menu"
            @click="handleChange(item.type)">
            {{ item.title }}
        </span>
        <zone-article-list
            v-if="articleType === 'article' || articleType === 'draft'"
            :type="articleType"
            :user-id="userId"
            slot="content">
        </zone-article-list>
        <zone-collect-list
            v-if="articleType === 'collect'"
            :type="articleType"
            :user-id="userId"
            slot="content">
        </zone-collect-list>
        <zone-follow-user-list
            v-if="articleType === 'followUser'"
            :type="articleType"
            :user-id="userId"
            slot="content">
        </zone-follow-user-list>
        <zone-fans-list
            v-if="articleType === 'fans'"
            :type="articleType"
            :user-id="userId"
            slot="content">
        </zone-fans-list>
    </zone-layout>
</template>

<script>
import ZoneLayout from './ZoneLayout';
import ZoneArticleList from './ZoneArticleList';
import ZoneCollectList from './ZoneCollectList';
import ZoneFollowUserList from './ZoneFollowUserList';
import ZoneFansList from './ZoneFansList';
import UserAvatar from '@/components/common/userAvatar';
import api from '@/utils/api';
import utils from '@/utils/utils';
export default {
    name: 'Zone',
    components: {
        ZoneLayout,
        ZoneArticleList,
        ZoneCollectList,
        ZoneFollowUserList,
        ZoneFansList,
        UserAvatar
    },
    data() {
        return {
            userInfo: {},
            headerTabData: [
                {
                    type: 'active',
                    title: '动态'
                },
                {
                    type: 'article',
                    title: '文章'
                },
                {
                    type: 'collect',
                    title: '收藏'
                },
                {
                    type: 'topic',
                    title: '专题'
                },
                {
                    type: 'followTopic',
                    title: '关注的专题'
                },
                {
                    type: 'followUser',
                    title: '关注的人'
                },
                {
                    type: 'fans',
                    title: '粉丝'
                }
            ]
        };
    },
    computed: {
        articleType() {
            return this.$route.params.articleType;
        },
        userId() {
            return this.$route.params.userId;
        },
        isFollow() {
            return false;
        },
        createTime() {
            return `加入日期： ${utils.formatDate.date(this.userInfo.createTime)}`;
        }
    },
    watch: {
        userId: {
            handler(n, o) {
                this.getUserInfo(n);
            },
            immediate: true
        }
    },
    methods: {
        getUserInfo(userId) {
            const params = {
                userId
            };
            api.getUserInfo(params).then((res) => {
                this.userInfo = res.data;
            });
        },
        handleChange(type) {
            this.$router.push(`/zone/${this.userId}/${type}`);
        },
        handleFollow() {
            alert('开发中...');
        }
    }
};
</script>
