<template>
    <layout>
        <card slot="list" :padding="false" class="fixed mb0">
            <template slot="menu">
                <div class="menu">
                    <div class="menu-btn round" @click="handleTopicArticle()">
                        <i class="icon icon-back"></i>
                        返回
                    </div>
                </div>
            </template>
            <div class="list">
                <ul>
                    <li
                        v-for="item in listData"
                        :key="item._id"
                        :class="{'active': item.articleId._id === articleId}"
                        @click="handleDetail(item.articleId._id)">
                        <div class="li">{{ item.articleId.title }}</div>
                    </li>
                </ul>
            </div>
        </card>
        <card slot="content" :visible-header="true" class="mb0 content">
            <article-content
                v-loading="loading"
                :title="title"
                :content="content"
                :viewCount="viewCount"
                :time="time"
                :tag="tag">
            </article-content>
        </card>
    </layout>
</template>

<script>
import Layout from './Layout';
import Card from '_c/card';
import ArticleContent from '_c/articleContent';
import api from '@/utils/api';
import utils from '@/utils/utils';
export default {
    name: 'TopicArticleDetail',
    components: {
        Layout,
        Card,
        ArticleContent
    },
    data() {
        return {
            loading: true,
            detail: {},
            listData: [],
            pageConfig: {
                pageSize: 15,
                currentPage: 1
            }
        };
    },
    computed: {
        topicId() {
            return this.$route.params.topicId;
        },
        articleId() {
            return this.$route.params.articleId;
        },
        title() {
            return this.detail.title;
        },
        content() {
            return this.detail.contentHtml;
        },
        viewCount() {
            return this.detail.viewCount || 0;
        },
        tag() {
            if (this.detail && this.detail.tagId && this.detail.tagId.parentId) {
                return `${this.detail.tagId.parentId.title} · ${this.detail.tagId.title}`;
            };
        },
        time() {
            if (this.detail && this.detail.publishTime) {
                let time = this.detail.publishTime;
                let end = utils.formatDate.time(time);
                let start = utils.formatDate.now();
                return `${utils.diffDate(start, end)}`;
            }
        }
    },
    watch: {
        topicId: {
            handler(n, o) {
                this.getTopicArticle(n);
            },
            immediate: true
        },
        articleId: {
            handler(n, o) {
                this.getTopicArticleDetail(n);
            },
            immediate: true
        }
    },
    mounted() {
        this.setEditorHeight();
        window.addEventListener('resize', this.setEditorHeight);
    },
    methods: {
        handleTopicArticle() {
            const path = `/topic/${this.topicId}`;
            this.$router.push(path);
        },
        handleDetail(articleId) {
            const path = `/topic/${this.topicId}/detail/${articleId}`;
            this.$router.push(path);
        },
        handleCommand(command) {
            if (command === 'edit') this.handleRouterEdit(this.articleId);
        },
        getTopicArticle(topicId) {
            const params = {
                topicId,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            api.topicArticleQuery(params).then((res) => {
                if (res.data.length > 0) {
                    this.listData.push(...res.data);
                } else {
                    this.noMore = true;
                }
            }).catch(() => {
            });
        },
        getTopicArticleDetail(articleId) {
            const params = { articleId };
            this.loading = true;
            api.articlePublishDetail(params).then((res) => {
                this.detail = res.data;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        // 设置编辑器高度
        setEditorHeight() {
            const list = document.querySelector('.list');
            list.style.height = window.innerHeight - 45 - 16 + 'px';

            const content = document.querySelector('.content');
            content.style.minHeight = window.innerHeight - 16 + 'px';
        }
    }
};
</script>
