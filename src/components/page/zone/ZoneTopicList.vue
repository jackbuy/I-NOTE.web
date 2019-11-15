<template>
    <card :padding="false" :visible-header="currentUserId !== userId">
        <div slot="menu" class="menu">
            <el-button
                :loading="creating"
                :disabled="loading"
                type="primary"
                size="mini"
                round
                @click="handleAdd">
                创建专题
            </el-button>
            <span
                v-if="currentUserId === userId && listData.length > 0"
                class="menu-btn round"
                @click="handleAction">{{ actionTitle}}</span>
        </div>
        <infinite-scroll
            :loading="loading"
            :no-more="noMore"
            :data="listData"
            @scroll="handleScroll"
            @loadData="getList">
            <template slot-scope="scope">
                <topic-item
                    :item="scope.row"
                    :item-id="scope.row._id"
                    :is-action="isAction"
                    type="simple"
                    @edit="handleRouterTopicEdit"
                    @delete="handleDelete">
                </topic-item>
            </template>
        </infinite-scroll>
    </card>
</template>

<script>
import InfiniteScroll from '@/components/common/infiniteScrollList';
import TopicItem from '@/components/common/topicItem';
import Card from '@/components/common/card';
import message from '@/mixins/message';
import api from '@/utils/api';

export default {
    name: 'ZoneTopicList',
    props: {
        type: String,
        userId: String,
        currentUserId: String
    },
    mixins: [ message ],
    components: {
        InfiniteScroll,
        TopicItem,
        Card
    },
    data() {
        return {
            isAction: false,
            listData: [],
            pageConfig: {
                pageSize: 15,
                currentPage: 1
            },
            creating: false,
            loading: false, // 加载中
            noMore: false // 没有更多数据
        };
    },
    computed: {
        zone() {
            return `${this.type}${this.userId}`;
        },
        actionTitle() {
            return this.isAction ? '完成' : '编辑';
        }
    },
    watch: {
        zone: {
            handler(n, o) {
                this.refresh();
            },
            immediate: true
        }
    },
    methods: {
        handleScroll(val) {
            this.$emit('scroll', val);
        },
        handleAction() {
            this.isAction = !this.isAction;
        },
        refresh() {
            this.pageConfig.currentPage = 1;
            this.listData = [];
            this.noMore = false;
            this.getList();
        },
        getList() {
            const params = {
                userId: this.userId,
                pageSize: this.pageConfig.pageSize,
                currentPage: this.pageConfig.currentPage++
            };
            this.loading = true;
            api.topicUserQuery(params).then((res) => {
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
        handleRouterTopicEdit(topicId) {
            this.$router.push({
                path: `/topicWrite/${topicId}`
            }).catch(() => {});
        },
        handleAdd() {
            this.creating = true;
            api.topicAdd({ title: '未命名专题' }).then((res) => {
                const { topicId } = res.data;
                this.$router.push({
                    path: `/topicWrite/${topicId}`
                }).catch(() => {});
            }).catch(() => {
                this.creating = false;
            });
        },
        handleDelete(topicId) {
            this.confirmWarning({
                title: '提示',
                content: '确认删除吗？'
            }).then(() => {
                api.topicDelete(topicId).then(() => {
                    this.showSuccessMsg('删除成功！');
                    this.refresh();
                }).catch(() => {});
            }).catch(() => {});
        }
    }
};
</script>
