<template>
    <zone-layout>
        <span
            v-for="item in headerTabData"
            :key="item.type"
            :class="{'active': articleType === item.type}"
            slot="header"
            @click="handleChange(item.type)">{{ item.title }}</span>
        <zone-article-list
            v-if="articleType === 'article' || articleType === 'draft'"
            :type="articleType"
            slot="content">
        </zone-article-list>
        <zone-collect-list
            v-if="articleType === 'collect'"
            :type="articleType"
            slot="content">
        </zone-collect-list>
        <zone-follow-user-list
            v-if="articleType === 'followUser'"
            :type="articleType"
            slot="content">
        </zone-follow-user-list>
        <zone-fans-list
            v-if="articleType === 'fans'"
            :type="articleType"
            slot="content">
        </zone-fans-list>
    </zone-layout>
</template>

<script>
import ZoneLayout from './layout';
import ZoneArticleList from './ZoneArticleList';
import ZoneCollectList from './ZoneCollectList';
import ZoneFollowUserList from './ZoneFollowUserList';
import ZoneFansList from './ZoneFansList';
export default {
    name: 'Zone',
    components: {
        ZoneLayout,
        ZoneArticleList,
        ZoneCollectList,
        ZoneFollowUserList,
        ZoneFansList
    },
    data() {
        return {
            headerTabData: [
                {
                    type: 'article',
                    title: '文章'
                },
                {
                    type: 'draft',
                    title: '草稿'
                },
                {
                    type: 'collect',
                    title: '收藏'
                },
                // {
                //     type: 'topic',
                //     title: '专题'
                // },
                // {
                //     type: 'followTopic',
                //     title: '关注的专题'
                // },
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
        }
    },
    methods: {
        handleChange(type) {
            this.$router.push(`/zone/${this.userId}/${type}`);
        }
    }
};
</script>
