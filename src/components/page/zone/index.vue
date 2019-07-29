<template>
    <zone-layout>
        <span
            v-for="item in headerTabData"
            :key="item.type"
            :class="{'active': articleType === item.type}"
            slot="header"
            @click="handleChange(item.type)">{{ item.title }}</span>
        <zone-article-list
            :type="articleType"
            slot="content">
        </zone-article-list>
    </zone-layout>
</template>

<script>
import ZoneLayout from './layout';
import ZoneArticleList from './ZoneArticleList';
export default {
    name: 'Zone',
    components: {
        ZoneLayout,
        ZoneArticleList
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
