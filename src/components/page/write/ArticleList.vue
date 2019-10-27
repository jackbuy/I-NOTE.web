<template>
    <div>
        <div class="write-search">
            <el-input
                v-model="keyword"
                size="mini"
                clearable
                placeholder="搜文章 (按 回车键 提交哟~)"
                @clear="handleSearch"
                @keyup.enter.native="handleSearch">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <tab :activeName="activeTabName" @tabClick="handleTabClick" class="mini">
            <tab-label name="all" label="全部"></tab-label>
            <tab-label name="publish" label="已发布"></tab-label>
            <tab-label name="draft" label="草稿"></tab-label>
        </tab>
        <page-loading :loading="loading" :data="data" class="write-list">
            <ul>
                <li
                    v-for="item in data"
                    :key="item._id"
                    :class="{'active': articleId === item._id}"
                    @click="handleEdit(item._id)">
                    <div class="li">
                        <div class="tit">
                            <i
                                v-if="item.isPublish"
                                :class="{'publish': item.isPublish}"
                                class="icon icon-wenzhang"></i>
                            <i v-else class="icon icon-wenzhang"></i>
                            {{ item.title }}
                        </div>
                        <div v-if="articleId === item._id" class="menu">
                            <el-dropdown
                                trigger="click"
                                @command="handleCommand">
                                <i class="icon icon-gengduo"></i>
                                <el-dropdown-menu class="write-dropdown-menu">
                                    <el-dropdown-item
                                        :command="composeValue('preview', item._id)"
                                        icon="icon icon-chakan">预览</el-dropdown-item>
                                    <el-dropdown-item
                                        v-if="!item.isPublish"
                                        :command="composeValue('publish', item._id)"
                                        divided
                                        icon="icon icon-fabu">发布文章</el-dropdown-item>
                                    <el-dropdown-item
                                        v-else
                                        :command="composeValue('cancelPublish', item._id)"
                                        divided
                                        icon="icon icon-quxiaofabu">取消发布</el-dropdown-item>
                                    <!-- <el-dropdown-item
                                        command="preview"
                                        icon="icon icon-quxiaofabu">分享给</el-dropdown-item>
                                    <el-dropdown-item
                                        :disabled="!item.isPublish"
                                        command="preview"
                                        icon="icon icon-jia">加入专题</el-dropdown-item> -->
                                    <el-dropdown-item
                                        :disabled="item.isPublish"
                                        :command="composeValue('del', item._id)"
                                        icon="el-icon-delete">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </li>
            </ul>
        </page-loading>
    </div>
</template>

<script>
import PageLoading from '_c/pageLoading';
import Tab from '_c/tab';
import TabLabel from '_c/tab/tabLabel';
export default {
    name: 'ArticleList',
    props: {
        loading: Boolean,
        articleId: String,
        activeTabName: String,
        data: {
            type: Array,
            default: () => []
        }
    },
    components: {
        PageLoading,
        Tab,
        TabLabel
    },
    data() {
        return {
            keyword: ''
        };
    },
    methods: {
        handleTabClick(name) {
            this.$emit('tab', name);
        },
        // 搜索
        handleSearch() {
            this.$emit('search', this.keyword);
        },
        // 编辑
        handleEdit(articleId) {
            this.$emit('change', articleId);
        },
        // action
        handleCommand(command) {
            const { item, articleId } = command;
            this.$emit(item, articleId);
        },
        composeValue(item, articleId) {
            return {
                item,
                articleId
            };
        }
    }
};
</script>
