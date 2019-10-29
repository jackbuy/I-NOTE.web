<template>
    <layout :is-has="isHas" :loading="pageLoading">
        <card slot="content" :visible-header="true" :padding="false">
            <infinite-scroll
                :loading="loading"
                :no-more="noMore"
                :data="listData"
                @loadData="getList(tagId)">
                <template slot-scope="scope">
                    <article-item
                        :item="scope.row">
                    </article-item>
                </template>
            </infinite-scroll>
        </card>
        <card slot="detail" icon="icon icon-huati" :title="tagDetail.title">
            <template v-if="tagDetailId" slot="menu">
                <div class="menu">
                    <div @click="handleFollow(tagDetailId)" class="menu-btn round">
                        <span v-if="!tagDetail.isFollow">关注</span>
                        <span v-else>已关注</span>
                    </div>
                </div>
            </template>
            <div class="count">文章 {{ articleCount }} 篇</div>
        </card>
    </layout>
</template>

<script>
import Layout from './Layout';
import Card from '@/components/common/card';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import api from '_u/api';
import To from '_u/to';

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
            pageLoading: false,
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
            if (this.tagDetail) return this.tagDetail.articleCount;
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
                tagId,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.articlePublishQuery(params).then((res) => {
                if (res.data.length > 0) {
                    this.listData.push(...res.data);
                } else {
                    this.noMore = true;
                }
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        async getTagDetail(tagId) {
            this.pageLoading = true;
            const [ err, result ] = await To(api.tagDetail({ tagId }));
            if (err || !result || !result.data) {
                this.isHas = false;
                this.pageLoading = false;
            }
            this.tagDetail = result.data;
            this.isHas = true;
            this.pageLoading = false;
            await this.getList(tagId);
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
