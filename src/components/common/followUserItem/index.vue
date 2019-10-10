<template>
    <div class="follow-user__item">
        <div
            class="img"
            @click="handleRouterPush(userId)">
            <img :src="avatar" alt="">
        </div>
        <div
            class="name"
            @click="handleRouterPush(userId)">
            {{ username }}
        </div>
    </div>
</template>

<script>
import { imgBaseUrl } from '@/constants/url-config';
export default {
    name: 'FansItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        username() {
            if (this.item && this.item.followUserId) return this.item.followUserId.nickname ? this.item.followUserId.nickname : this.item.followUserId.username;
        },
        userId() {
            if (this.item && this.item.followUserId) return this.item.followUserId._id;
        },
        avatar() {
            if (this.item && this.item.followUserId) return `${imgBaseUrl}/${this.item.followUserId.avatar}`;
        }
    },
    methods: {
        handleRouterPush(userId) {
            let path = `/zone/${userId}/article`;
            this.$router.push(path).catch(() => {});
        }
    }
};
</script>
