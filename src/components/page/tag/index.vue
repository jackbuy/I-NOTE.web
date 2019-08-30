<template>
    <infinite-scroll
        :loading="loading"
        :no-more="noMore"
        :data="listData"
        class="tag-list"
        @loadData="getList()">
        <template slot-scope="scope">
            <tag-item :item="scope.row" @doFollow="handleFollow"></tag-item>
        </template>
    </infinite-scroll>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import TagItem from '@/components/common/tagItem';
import api from '@/utils/api';
export default {
    name: 'Tag',
    components: {
        InfiniteScroll,
        TagItem
    },
    data() {
        return {
            listData: [],
            pageConfig: {
                pageSize: 40,
                currentPage: 1
            },
            loading: false, // 加载中
            noMore: false // 没有更多数据
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            const params = {
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.tagQuery(params).then((res) => {
                this.loading = false;
                if (res.data.length > 0) {
                    this.listData.push(...res.data);
                } else {
                    this.noMore = true;
                }
            }).catch(() => {
                this.loading = false;
            });
        },
        // 关注
        handleFollow(tagId) {
            const params = {
                followTagId: tagId
            };
            api.followTag(params).then((res) => {
                this.listData.map((item) => {
                    if (item._id === tagId) {
                        item.isFollow = !item.isFollow;
                    }
                });
            }).catch(() => {});
        }
    }
};
</script>
