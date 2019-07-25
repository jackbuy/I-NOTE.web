<template>
    <div class="zone">
        <div class="zone__header">
            <span
                v-for="item in headerTabData"
                :key="item.type"
                :class="{'active': articleType === item.type}"
                @click="handleChange(item.type)">{{ item.title }}</span>
        </div>
        <div class="zone__content">
            <zone-article-list
                :type="articleType">
            </zone-article-list>
        </div>
    </div>
</template>

<script>
import ZoneArticleList from './ZoneArticleList';
export default {
    name: 'Zone',
    components: {
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

<style lang="less">
@import './index.less';
</style>
