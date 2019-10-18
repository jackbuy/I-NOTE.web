<template>
    <page-loading :loading="loading" :data="listData" class="tag">
        <div
            v-for="item in listData"
            :key="item._id">
            <div class="tag-header">{{ item.title }}</div>
            <div class="tag-list">
                <tag-item
                    v-for="child in item.children"
                    :key="child._id"
                    :item="child"
                    @doFollow="handleFollow">
                </tag-item>
            </div>
        </div>
    </page-loading>
</template>

<script>
import PageLoading from '_c/pageLoading';
import TagItem from './TagItem';
import api from '@/utils/api';
export default {
    name: 'Tag',
    components: {
        TagItem,
        PageLoading
    },
    data() {
        return {
            listData: [],
            loading: false // 加载中
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.loading = true;
            api.tagQuery().then((res) => {
                this.loading = false;
                this.listData = res.data;
            }).catch(() => {
                this.loading = false;
            });
        },
        // 关注
        handleFollow(tagId) {
            const params = {
                followTagId: tagId
            };
            api.followTag(params).then((res) => {
                this.listData.map((item) => {
                    item.children.map((child) => {
                        if (child._id === tagId) {
                            child.isFollow = !child.isFollow;
                        }
                    });
                });
            }).catch(() => {});
        }
    }
};
</script>
