<template>
    <div
        slot="content">
        <div
            v-for="item in data"
            :key="item._id">
            {{item.userId.username}}
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
        type: String
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
                this.getCollectList(n);
            },
            immediate: true
        }
    },
    methods: {
        getCollectList(type) {
            api.fansQuery().then((res) => {
                this.data = res.data;
            });
        }
        // handleDelete(row) {
        //     const { _id } = row;
        //     this.confirmWarning({
        //         title: '提示',
        //         content: '确认删除吗？'
        //     }).then(() => {
        //         api.articleDelete(_id).then(() => {
        //             this.showSuccessMsg('删除成功！');
        //             this.getArticleList(this.articleType);
        //         });
        //     }).catch(() => {});
        // }
    }
};
</script>
