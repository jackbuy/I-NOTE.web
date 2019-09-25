<template>
    <layout :is-has="isHas">
        <infinite-scroll
            slot="content"
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList(tagId)">
            <template slot-scope="scope">
                <article-item
                    :item="scope.row"
                    :show-menu-edit="false"
                    :show-menu-delete="false">
                </article-item>
            </template>
        </infinite-scroll>
        <card slot="detail" icon="icon icon-bq" :title="tagDetail.title">
            <template v-if="tagDetailId" slot="menu">
                <div class="menu">
                    <div @click="handleFollow(tagDetailId)" class="menu-btn round">
                        <span v-if="!tagDetail.isFollow">关注</span>
                        <span v-else>已关注</span>
                    </div>
                </div>
            </template>
            <div class="count">{{ articleCount }}</div>
        </card>
    </layout>
</template>

<script>
import Layout from './layout';
import Card from '@/components/common/card';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import api from '@/utils/api';

export default {
    name: 'Draft',
    components: {
        InfiniteScroll,
        ArticleItem,
        Layout,
        Card
    },
    data() {
        return {
            isHas: true,
            tagDetail: {},
            listData: [],
            pageConfig: {
                pageSize: 15,
                currentPage: 1
            },
            loading: false, // 加载中
            noMore: false // 没有更多数据
        };
    },
    computed: {
        tagId() {
            return this.$route.params.tagId;
        },
        tagDetailId() {
            if (this.tagDetail) return this.tagDetail._id;
        },
        articleCount() {
            if (this.tagDetail) return `共 ${this.tagDetail.articleCount} 篇文章`;
        }
    },
    watch: {
        tagId: {
            handler(n, o) {
                this.refresh(n);
            },
            immediate: true
        }
    },
    methods: {
        refresh(tagId) {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getTagDetail(tagId);
        },
        getList(tagId) {
            const params = {
                publish: true,
                tagId,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.articleQuery(params).then((res) => {
                if (res.data.length > 0) {
                    this.listData.push(...res.data);
                } else {
                    this.noMore = true;
                }
                this.isHas = true;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        getTagDetail(tagId) {
            api.tagDetail({ tagId }).then((res) => {
                this.tagDetail = res.data;
                this.isHas = true;
                this.getList(tagId);
            }).catch(() => {
                this.isHas = false;
            });
        },
        // 关注
        handleFollow(tagId) {
            const params = {
                followTagId: tagId
            };
            api.followTag(params).then(() => {
                this.tagDetail.isFollow = !this.tagDetail.isFollow;
            }).catch(() => {});
        }
    }
};
</script>
