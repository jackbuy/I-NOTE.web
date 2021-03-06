<template>
    <div class="layout__header-search">
        <el-popover
            v-model="historyKeywordVisible"
            placement="bottom"
            width="240"
            trigger="manual">
            <div class="history-keyword-list">
                <div
                    v-for="item in historyKeywordList"
                    :key="item"
                    class="history-keyword-list-item"
                    @click="handleSearchHistory(item)">
                    <i class="el-icon-time"></i> {{item}}
                    <i class="el-icon-close delete" @click.stop="handleDelete(item)"></i>
                </div>
            </div>
            <el-form
                slot="reference"
                @submit.native.prevent>
                <el-form-item>
                    <el-input
                        v-model.trim="keyword"
                        placeholder="搜 文章 · 专题 · 作者"
                        size="mini"
                        maxlength="30"
                        clearable
                        @blur="openSearchHistory"
                        @focus="openSearchHistory"
                        @keyup.enter.native="handleSearch($event)"></el-input>
                </el-form-item>
            </el-form>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: 'LayoutHeaderSearch',
    data() {
        return {
            historyKeywordVisible: false,
            keyword: '',
            historyKeywordList: []
        };
    },
    computed: {
        urlPath() {
            return this.$route.path.split('/')[1];
        }
    },
    watch: {
        urlPath: {
            handler(n, o) {
                if (n !== 'search') this.keyword = '';
            },
            immediate: true
        }
    },
    mounted() {
        this.getHistoryKeywordList();
    },
    methods: {
        handleSearch($event) {
            if (!this.keyword) return;
            event.target.blur();
            this.addHistoryKeywordList(this.keyword);
            this.$emit('search', this.keyword);
            this.historyKeywordVisible = false;
            this.getHistoryKeywordList();
        },
        handleSearchHistory(keyword) {
            this.historyKeywordVisible = false;
            this.keyword = keyword;
            this.$emit('search', keyword);
        },
        addHistoryKeywordList(keyword) {
            let val = [];
            let arr = localStorage.getItem('keyword');
            if (arr) {
                let o = JSON.parse(arr);
                if (o.indexOf(keyword) === -1) {
                    if (o.length === 5) o.splice(o.length - 1, 1);
                    o.unshift(keyword);
                    localStorage.setItem('keyword', JSON.stringify(o));
                }
            } else {
                val.push(keyword);
                localStorage.setItem('keyword', JSON.stringify(val));
            }
        },
        getHistoryKeywordList() {
            let arr = localStorage.getItem('keyword');
            if (arr) this.historyKeywordList = JSON.parse(arr);
        },
        handleDelete(keyword) {
            if (localStorage.getItem('keyword')) {
                if (!this.historyKeywordVisible && this.historyKeywordList.length > 1) this.historyKeywordVisible = true;
                if (this.historyKeywordList.length === 1) this.historyKeywordVisible = false;
                let arr = JSON.parse(localStorage.getItem('keyword'));
                let index = arr.indexOf(keyword);
                arr.splice(index, 1);
                localStorage.setItem('keyword', JSON.stringify(arr));
                this.getHistoryKeywordList();
            }
        },
        openSearchHistory(e) {
            if (this.historyKeywordList.length > 0) {
                if (e.type === 'focus') {
                    this.historyKeywordVisible = true;
                } else {
                    this.historyKeywordVisible = false;
                }
            }
        }
    }
};
</script>

<style lang="less">
.history-keyword-list{
    &-item{
        border-top: 1px solid #eee;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        position: relative;
        &:first-child{
            border-top-width: 0;
        }
        i{
            vertical-align: middle;
        }
        .delete{
            position: absolute;
            top: 0;
            right: 0;
            width: 40px;
            text-align: center;
            height: 40px;
            line-height: 40px;
            z-index: 2;
            &:hover{
                color: #f60;
            }
        }
    }
}
</style>
