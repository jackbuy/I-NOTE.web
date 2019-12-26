<template>
    <span :title="username" @click="handleZone(userId)">
        <el-avatar v-if="imgUrl" :size="30" fit="cover" :src="imgUrl"></el-avatar>
        <el-avatar v-else :size="30" fit="cover" :src="imgUrl"><i class="icon icon-yonghu"></i></el-avatar>
    </span>
</template>

<script>
import { imgBaseUrl } from '@/constants/url-config';
export default {
    name: 'ArticleTagItem',
    props: {
        item: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        userId() {
            return this.item._id;
        },
        username() {
            return this.item.nickname ? this.item.nickname : this.item.username;
        },
        imgUrl() {
            return this.item && this.item.avatar ? `${imgBaseUrl}/${this.item.avatar}` : '';
        }
    },
    methods: {
        handleZone(userId) {
            this.$router.push(`/zone/${userId}/article`).catch(() => {});
        }
    }
};
</script>
