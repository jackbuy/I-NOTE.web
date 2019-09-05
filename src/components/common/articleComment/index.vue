<template>
    <div class="comment">
        <comment-input @save="handleSaveComment"></comment-input>
        <comment-item
            v-for="item in commentList"
            v-model="isReply"
            :key="item._id"
            :item="item"
            @reply="openReply">
            <template slot-scope="scope">
                <comment-item
                    v-for="item in scope.reply"
                    v-model="isReply"
                    :key="item._id"
                    :item="item"
                    @reply="openReply">
                </comment-item>
            </template>
        </comment-item>
        <reply-modal
            v-if="isReply"
            v-model="isReply"
            @save="handleReplyComment">
        </reply-modal>
    </div>
</template>

<script>
import api from '@/utils/api';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import ReplyModal from './ReplyModal';
export default {
    name: '',
    props: {
        articleId: {
            type: String,
            default: ''
        },
        authorId: {
            type: String,
            default: ''
        }
    },
    components: {
        CommentInput,
        CommentItem,
        ReplyModal
    },
    data() {
        return {
            commentList: [],
            parentId: '', // 父级id
            replyUserId: '', // 回复user的id
            isReply: false // 是否回复
        };
    },
    computed: {
    },
    watch: {
        articleId: {
            handler(n, o) {
                this.getCommentList(n);
            },
            immediate: true
        }
    },
    methods: {
        handleSaveComment(obj) {
            const params = {
                articleId: this.articleId,
                authorId: this.authorId,
                ...obj
            };
            api.commentSave(params).then((res) => {
                this.getCommentList(this.articleId);
            }).catch(() => {});
        },
        // 打开回复
        openReply(obj) {
            const { parentId, replyUserId } = obj;
            this.parentId = parentId;
            this.replyUserId = replyUserId;
        },
        // 取消回复
        closeReply() {
            this.isReply = false;
        },
        // 提交回复
        handleReplyComment(obj) {
            const params = {
                articleId: this.articleId,
                parentId: this.parentId,
                replyUserId: this.replyUserId,
                ...obj
            };
            api.commentReply(params).then((res) => {
                this.closeReply();
                this.getCommentList(this.articleId);
            }).catch(() => {});
        },
        getCommentList(articleId) {
            api.commentQuery({ articleId }).then((res) => {
                this.commentList = res.data;
            }).catch(() => {});
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>
