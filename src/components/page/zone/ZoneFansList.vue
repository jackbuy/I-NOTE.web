<template>
    <div
        class="follow-user"
        slot="content">
        <div
            v-for="item in data"
            :key="item._id"
            class="list">
            <span
                class="name"
                @click="handleZone(item.userId._id)">
                {{item.userId.username}}
            </span>
        </div>
    </div>
</template>

<script>
import message from '@/mixins/message';
import api from '@/utils/api';

export default {
    name: 'ZoneFollowUserList',
    mixins: [ message ],
    props: {
        type: String,
        userId: String
    },
    components: {
    },
    data() {
        return {
            data: []
        };
    },
    watch: {
        type: {
            handler(n, o) {
                this.getCollectList();
            },
            immediate: true
        }
    },
    methods: {
        getCollectList() {
            const params = {
                userId: this.userId,
                type: 0
            };
            api.fansQuery(params).then((res) => {
                this.data = res.data;
            });
        },
        handleZone(userId) {
            this.$router.push(`/zone/${userId}/article`);
        }
    }
};
</script>
