<template>
    <div class="comment-item">
        <div class="header">
            <div class="header-title">
                <span
                    class="img">
                    <img :src="avatar" alt="">
                </span>
                <span>{{ nickName }}</span>
                <span v-if="replyUserNickName && !isMine">
                    <span>回复</span>
                    <span>{{ replyUserNickName }}</span>
                </span>
                <span>{{ createTime }}</span>
            </div>
            <div class="header-menu">
                <span @click="handleToggleReply">回复</span>
            </div>
        </div>
        <div class="content">
            {{ content }}
        </div>
        <div class="children">
            <slot :reply="reply"></slot>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { OPEN_LOGIN_MODAL } from '@/store/mutation-types';
import utils from '@/utils/utils';
import CommentInput from './CommentInput';
import { imgBaseUrl } from '@/constants/url-config';
export default {
    name: '',
    components: {
        CommentInput
    },
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        value: Boolean
    },
    computed: {
        user() {
            if (this.item) return this.item.commentUserId;
        },
        replyUser() {
            if (this.item) return this.item.replyUserId;
        },
        userId() {
            if (this.item) return this.item.commentUserId._id;
        },
        nickName() {
            if (this.user) return this.user.nickname;
        },
        isMine() {
            if (this.replyUser && this.user) return this.replyUser._id === this.user._id;
        },
        replyUserNickName() {
            if (this.replyUser) return this.replyUser.nickname;
        },
        avatar() {
            if (this.user) return `${imgBaseUrl}/${this.user.avatar}`;
        },
        content() {
            if (this.item) return this.item.content;
        },
        commentId() {
            if (this.item) return this.item._id;
        },
        parentId() {
            if (this.item) return this.item.parentId;
        },
        reply() {
            if (this.item) return this.item.reply;
        },
        createTime() {
            if (this.item) {
                let end = utils.formatDate.time(this.item.createTime);
                let start = utils.formatDate.now();
                return `${utils.diffDate(start, end)}`;
            }
        },
        // 当前登录用户Id
        currentUserId() {
            return localStorage.getItem('userId');
        }
    },
    methods: {
        ...mapMutations({
            openLoginModal: OPEN_LOGIN_MODAL
        }),
        handleToggleReply() {
            if (!this.currentUserId) return this.openLoginModal();
            const params = {
                parentId: this.parentId ? this.parentId : this.commentId,
                replyUserId: this.userId
            };
            this.$emit('input', true);
            this.$emit('reply', params);
        }
    }
};
</script>
