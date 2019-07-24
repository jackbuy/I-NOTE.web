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
.zone{
    &__header{
        font-size: 0;
        margin-bottom: 15px;
        span{
            display: inline-block;
            padding: 5px 10px;
            font-size: 14px;
            margin-right: 20px;
            cursor: pointer;
            &.active{
                color: #069;
                background: #ccc;
                border-radius: 4px;
            }
        }
    }
    &__content{}
}
</style>
