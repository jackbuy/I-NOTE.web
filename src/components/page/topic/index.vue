<template>
    <topic-list
        :load-more="isLoadMore"
        :no-more="isLoadFinish"
        :data="topicData">
        <topic-list-item
            slot-scope="scope"
            :item="scope.row">
        </topic-list-item>
    </topic-list>
</template>

<script>
import TopicList from '@/components/common/topicList';
import TopicListItem from '@/components/common/topicList/Item';
import scrollEvent from '@/mixins/scrollEvent';
import api from '@/utils/api';

export default {
    name: 'Search',
    mixins: [ scrollEvent ],
    components: {
        TopicList,
        TopicListItem
    },
    data() {
        return {
            topicData: [],
            pageConfig: {
                pageSize: 5,
                currentPage: 1,
                total: 0
            },
            isLoadMore: false, // 是否加载中,
            isLoadFinish: false // 是否加载完成
        };
    },
    computed: {
        tagId() {
            return this.$route.params.tagId;
        }
    },
    watch: {
        tagId: {
            handler(n, o) {
                this.getArticleList(n);
            },
            immediate: true
        }
    },
    methods: {
        // 滚动条到底部，异步加载数据
        scrollToBottomLoadData() {
            if (!this.isLoadFinish && !this.isLoadMore) this.getArticleList(this.tagId);
        },
        getArticleList(tagId, loadType = 'loadMore') {
            const params = {
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.isLoadMore = true;
            api.topicQuery(params).then((res) => {
                this.pageConfig.total = res.total;
                this.isLoadMore = false;
                if (loadType === 'loadMore') {
                    this.topicData.push(...res.data);
                } else {
                    this.topicData = res.data;
                }
                if (this.topicData.length === res.total) this.isLoadFinish = true;
            });
        }
    }
};
</script>
