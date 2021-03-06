<template>
    <div class="comment">
        <comment-input v-if="currentUserId" @save="handleSaveComment"></comment-input>
        <template v-if="commentList && commentList.length > 0">
            <comment-item
                v-for="item in commentList"
                v-model="isReply"
                :key="item._id"
                :item="item"
                class="parent"
                @reply="openReply"
                @delete="commentDelete">
                <template slot-scope="scope">
                    <comment-item
                        v-for="item in scope.reply"
                        v-model="isReply"
                        :key="item._id"
                        :item="item"
                        @reply="openReply"
                        @delete="commentDelete">
                    </comment-item>
                </template>
            </comment-item>
            <reply-modal
                v-if="isReply"
                v-model="isReply"
                @save="handleReplyComment">
            </reply-modal>
        </template>
        <template v-else>
            <comment-item-empty></comment-item-empty>
        </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '@/utils/api';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import CommentItemEmpty from './CommentItemEmpty';
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
        CommentItemEmpty,
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
        ...mapGetters({
            currentUserId: 'currentUserId'
        })
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
        // 提交评论
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
        },
        // 删除评论
        commentDelete(commentId) {
            const params = {
                articleId: this.articleId
            };
            api.commentDelete(commentId, params).then((res) => {
                this.getCommentList(this.articleId);
            });
        }
    }
};
</script>
