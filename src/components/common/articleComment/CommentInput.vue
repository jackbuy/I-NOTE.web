<template>
    <div class="comment-input">
        <textarea
            v-model="form.content"
            placeholder="写评论..."
            rows="3">
        </textarea>
        <button
            :disabled="!form.content"
            class="save"
            @click="handleSave">提交</button>
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
