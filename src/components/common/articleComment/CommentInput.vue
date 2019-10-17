<template>
    <div class="comment-input">
        <el-form
            ref="form"
            :model="form">
            <el-form-item>
                <el-input
                    v-model="form.content"
                    type="textarea"
                    placeholder="写评论..."
                    class="textarea"
                    maxlength="300"
                    rows="4"
                    show-word-limit>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    :disabled="!form.content"
                    type="primary"
                    round
                    @click="handleSave">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import message from '@/mixins/message';
export default {
    name: '',
    mixins: [ message ],
    data() {
        return {
            form: {}
        };
    },
    methods: {
        handleSave() {
            // 删除开头空
            const content = this.form.content.replace(/^\s+/g, '');
            if (content) {
                this.$emit('save', this.form);
                this.form = {};
            } else {
                this.showWarningMsg('评论不能为空！');
            }
        },
        handleCancel() {
            this.form = {};
            this.$emit('cancel');
        }
    }
};
</script>
