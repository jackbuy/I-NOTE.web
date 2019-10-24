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
                        <div v-if="articleId === item._id && !item.isPublish" class="menu">
                            <span @click="handleDelete(item._id)"><i class="el-icon-delete"></i></span>
                        </div>
                    </div>
                </li>
            </ul>
        </page-loading>
    </div>
</template>

<script>
import PageLoading from '_c/pageLoading';
export default {
    name: 'ArticleList',
    props: {
        loading: Boolean,
        articleId: String,
        data: {
            type: Array,
            default: () => []
        }
    },
    components: {
        PageLoading
    },
    data() {
        return {
            keyword: ''
        };
    },
    methods: {
        // 搜索
        handleSearch() {
            this.$emit('search', this.keyword);
        },
        // 编辑
        handleEdit(articleId) {
            const path = `/write/${articleId}`;
            this.$router.push(path).catch(() => {});
        },
        // 删除
        handleDelete(articleId) {
            this.$emit('del', articleId);
        }
    }
};
</script>
