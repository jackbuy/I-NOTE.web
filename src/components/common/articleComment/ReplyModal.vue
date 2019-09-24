<template>
    <modal
        :title="modalTitle"
        :visible="modalVisible"
        class="reply"
        @submit.native.prevent
        @handleClose="handleCloseModal">
        <comment-input
            @save="handleReplyComment">
        </comment-input>
    </modal>
</template>

<script>
import CommentInput from './CommentInput';
import Modal from '@/components/common/modal';
export default {
    name: '',
    components: {
        CommentInput,
        Modal
    },
    props: {
        value: Boolean
    },
    computed: {
        modalVisible() {
            return this.value;
        }
    },
    data() {
        return {
            modalTitle: '回复',
            form: {},
            rules: {
                email: [
                    { required: true, message: '必填' }
                ]
            }
        };
    },
    methods: {
        handleCloseModal() {
            this.$emit('input', false);
        },
        handleReplyComment(obj) {
            this.$emit('save', obj);
        }
    }
};
</script>

<style>
.reply .el-dialog__body{
    padding: 10px 15px 0 15px;
}
</style>
