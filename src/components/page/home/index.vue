<template>
    <home-layout>
        <card slot="tag" icon="icon icon-huati" title="热门话题">
            <template slot="menu">
                <div class="menu">
                    <span class="menu-btn" @click="handleRouterPush('/tag')">更多</span>
                </div>
            </template>
            <tag-recommend
                v-for="item in tagRecommendData"
                :key="item._id"
                :item="item">
            </tag-recommend>
        </card>
        <card slot="content" :padding="false" icon="icon icon-dongtai" title="动态">
            <div slot="menu" class="menu">
                <el-button
                    v-if="isNewPost"
                    :loading="loading"
                    type="primary"
                    size="mini"
                    round
                    icon="el-icon-refresh"
                    @click="reload">
                    新动态来袭~
                </el-button>
            </div>
            <infinite-scroll
                :loading="loading"
                :no-more="noMore"
                :data="listData"
                @loadData="getList(sortType, 'more')">
                <template slot-scope="scope">
                    <article-item
                        :item="scope.row">
                    </article-item>
                </template>
            </infinite-scroll>
        </card>
        <card slot="introduce" :visible-header="true" :padding="false" title="介绍">
            <introduce
                v-model="showIntroduce">
            </introduce>
        </card>
        <card slot="topic" icon="icon icon-zhuanti" title="热门专题">
            <template slot="menu">
                <div class="menu">
                    <span class="menu-btn" @click="handleRouterPush('/topic')">更多</span>
                </div>
            </template>
            <topic-recommend
                v-for="item in topicRecommendData"
                :key="item._id"
                :item="item">
            </topic-recommend>
        </card>
        <card slot="author" icon="icon icon-zuozhe" title="推荐作者">
            <user-recommend
                v-for="item in authorRecommendData"
                :key="item._id"
                :item="item">
            </user-recommend>
        </card>
        <card slot="operation" icon="icon icon-yunying" title="运营状态">
            <operations
                :data="operationsData">
            </operations>
        </card>
    </home-layout>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { SOCKET_NEW_POST_RESET } from '@/store/mutation-types';
import HomeLayout from './Layout';
import InfiniteScroll from '@/components/common/infiniteScrollList';
import ArticleItem from '@/components/common/articleItem';
import Introduce from '@/components/common/introduce';
import TagRecommend from '@/components/common/tagRecommend';
import ArticleRecommend from '@/components/common/articleRecommend';
import TopicRecommend from '@/components/common/topicRecommend';
import UserRecommend from '@/components/common/userRecommend';
import Operations from '@/components/common/operations';
import Card from '@/components/common/card';
import Tab from '@/components/common/tab';
import TabLabel from '@/components/common/tab/tabLabel';
import api from '@/utils/api';

export default {
    name: 'Home',
    components: {
        HomeLayout,
        InfiniteScroll,
        ArticleItem,
        TagRecommend,
        TopicRecommend,
        UserRecommend,
        ArticleRecommend,
        Operations,
        Card,
        Tab,
        TabLabel,
        Introduce
    },
    data() {
        return {
            showIntroduce: true,
            isNewPost: false,
            sortType: 'newest',
            listData: [],
            tagRecommendData: [], // Tag推荐
            authorRecommendData: [], // 作者推荐
            topicRecommendData: [], // 专题推荐
            recommendData: [], // 文章推荐
            operationsData: {}, // 数量统计
            pageConfig: {
                pageSize: 15,
                currentPage: 1
            },
            loading: false, // 加载中
            noMore: false // 没有更多数据
        };
    },
    computed: {
        ...mapState({
            socketNewPost: state => state.socketNewPost
        }),
        ...mapGetters({
            currentUserId: 'currentUserId'
        })
    },
    watch: {
        socketNewPost: {
            handler(n, o) {
                if (n && n.type === 'newPost') {
                    this.isNewPost = true;
                } else {
                    this.isNewPost = false;
                }
            },
            immediate: true
        }
    },
    created() {
        this.getTagRecommend();
        this.getUserRecommend();
        this.getTopicRecommend();
        this.getOperationsCount();
        this.getList(this.sortType);
    },
    activated() {
        this.showIntroduce = true;
        this.getTagRecommend();
        this.getUserRecommend();
        this.getTopicRecommend();
        this.getOperationsCount();
    },
    deactivated() {
        this.showIntroduce = false;
    },
    methods: {
        ...mapMutations({
            newPostReset: SOCKET_NEW_POST_RESET
        }),
        reload() {
            this.pageConfig.currentPage = 1;
            this.noMore = false;
            this.getList(this.sortType, 'reload');
        },
        // 动态
        getList(sortType, type) {
            const params = {
                sortType,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.articlePublishQuery(params).then((res) => {
                this.loading = false;
                if (res.data.length > 0) {
                    if (type === 'reload') {
                        this.listData = res.data;
                        this.newPostReset();
                    } else {
                        if (type !== 'more') {
                            this.newPostReset();
                        }
                        this.listData.push(...res.data);
                    }
                } else {
                    this.noMore = true;
                }
            }).catch(() => {
                this.loading = false;
            });
        },
        handleSort(sortType) {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getList(sortType);
        },
        // 热门话题
        getTagRecommend() {
            api.tagRecommend().then((res) => {
                this.tagRecommendData = res.data;
            }).catch(() => {});
        },
        // 推荐作者
        getUserRecommend() {
            const params = {
                currentPage: 1,
                pageSize: 3
            };
            api.userPublishQuery(params).then((res) => {
                this.authorRecommendData = res.data;
            }).catch(() => {});
        },
        // 推荐专题
        getTopicRecommend() {
            api.topicRecommend().then((res) => {
                this.topicRecommendData = res.data;
            }).catch(() => {});
        },
        // 运营状态
        getOperationsCount() {
            api.operationsCount().then((res) => {
                this.operationsData = res.data;
            }).catch(() => {});
        },
        handleRouterPush(path) {
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>

<style>
.fixed{
        position: sticky;
        top: 65px;
    }
</style>
