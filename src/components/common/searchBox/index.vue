<template>
    <div class="search-box">
        <el-form @submit.native.prevent>
            <el-form-item>
                <el-input
                    v-model.trim="keyword"
                    :placeholder="placeholder"
                    clearable
                    @keyup.enter.native="handleSearch($event)"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'LayoutHeaderSearch',
    props: {
        placeholder: {
            type: String,
            default: '搜索'
        }
    },
    data() {
        return {
            keyword: ''
        };
    },
    methods: {
        handleSearch($event) {
            if (!this.keyword) return;
            this.$emit('search', this.keyword);
        }
    }
};
</script>
