<template>
    <div class="comment-item">
        <div class="header">
            <div class="header-title">
                <el-avatar v-if="userImg" :size="20" fit="cover" :src="userImg"></el-avatar>
                <el-avatar v-else :size="20"><i class="icon icon-yonghu"></i></el-avatar>
                <span class="name">{{ nickName }}</span>
                <span v-if="replyUserNickName && !isMine">
                    <span>回复</span>
                    <span class="name">{{ replyUserNickName }}</span>
                </span>
                <span>{{ createTime }}</span>
            </div>
            <div class="header-menu">
                <span v-if="currentUserId === commentUserId" @click="handleDelete">删除</span>
                <span @click="handleToggleReply">回复</span>
            </div>
        </div>
        <div class="content">
            {{ content }}
        </div>
        <div v-if="reply && reply.length > 0" class="children">
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
        userImg() {
            if (this.user) return `${imgBaseUrl}/${this.user.avatar}`;
        },
        content() {
            if (this.item) return this.item.content;
        },
        commentId() {
            if (this.item) return this.item._id;
        },
        commentUserId() {
            if (this.item) return this.item.commentUserId._id;
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
        },
        handleDelete() {
            this.$emit('delete', this.commentId);
        }
    }
};
</script>
