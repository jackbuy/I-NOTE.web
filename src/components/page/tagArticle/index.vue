<template>
    <layout>
        <infinite-scroll
            slot="content"
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @loadData="getList(tagId)">
            <template slot-scope="scope">
                <article-item :item="scope.row">
                    <template slot-scope="scopeInner">
                        <button
                            :disabled="loading || scopeInner.row.userId._id === currentUserId"
                            :class="{'active': scopeInner.row.isLike}"
                            @click="handleLike(scopeInner.row._id, scopeInner.row.isLike)">
                            <i v-if="scopeInner.row.isLike" class="icon icon-dianzan"></i>
                            <i v-else class="icon icon-dianzan-o"></i>
                            {{ scopeInner.row.likeCount > 0 ? scopeInner.row.likeCount : '' }}
                        </button>
                        <button
                            :disabled="loading || scopeInner.row.userId._id === currentUserId"
                            :class="{'active': scopeInner.row.isCollect}"
                            @click="handleCollect(scopeInner.row._id, scopeInner.row.isCollect)">
                            <i v-if="scopeInner.row.isCollect" class="icon icon-like"></i>
                            <i v-else class="icon icon-like-o"></i>
                            {{ scopeInner.row.collectCount > 0 ? scopeInner.row.collectCount : '' }}
                        </button>
                    </template>
                </article-item>
            </template>
        </infinite-scroll>
        <card slot="detail" icon="icon icon-bq" :title="tagDetail.title">
            <template v-if="tagDetailId" slot="menu">
                <div class="menu">
                    <div @click="handleFollow(tagDetailId)" class="menu-btn">
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
import articleCommon from '@/mixins/articleCommon';
import api from '@/utils/api';

export default {
    name: 'Draft',
    mixins: [ articleCommon ],
    components: {
        InfiniteScroll,
        ArticleItem,
        Layout,
        Card
    },
    data() {
        return {
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
            if (this.tagDetail._id) return this.tagDetail._id;
        },
        articleCount() {
            if (this.tagDetail.articleCount) return `共 ${this.tagDetail.articleCount} 篇文章`;
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
            this.getList(tagId);
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
        getTagDetail(tagId) {
            api.tagDetail({ tagId }).then((res) => {
                this.tagDetail = res.data;
            }).catch(() => {});
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
