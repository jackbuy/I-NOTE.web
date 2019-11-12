<template>
    <div class="article-empty">
        <div>
            <div class="i"><i class="icon icon-wenzhang"></i></div>
            <div class="tit">我的文章，空空如也~</div>
            <div>
                <el-button
                    :loading="createLoading"
                    :disabled="isSaving"
                    size="mini"
                    icon="icon icon-jia"
                    @click="handleAdd">
                    添加
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        isSaving: Boolean,
        createLoading: Boolean
    },
    methods: {
        handleAdd() {
            this.$emit('add');
        }
    }
};
</script>
