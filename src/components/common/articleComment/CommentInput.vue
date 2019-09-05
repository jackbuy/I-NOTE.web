<template>
    <div class="comment-input">
        <textarea
            v-model="form.content"
            placeholder="写评论..."
            rows="3">
        </textarea>
        <button class="save" @click="handleSave">提交</button>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            form: {}
        };
    },
    methods: {
        handleSave() {
            this.$emit('save', this.form);
            this.form = {};
        },
        handleCancel() {
            this.form = {};
            this.$emit('cancel');
        }
    }
};
</script>
