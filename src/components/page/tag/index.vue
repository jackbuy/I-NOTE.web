<template>
    <tag-layout>
        <tag-list slot="list">
            <tag-list-item
                v-for="item in tagListData"
                :key="item._id"
                :item="item"
                @doFollow="handleFollow">
            </tag-list-item>
        </tag-list>
    </tag-layout>
</template>

<script>
import TagLayout from './Layout';
import TagList from './TagList';
import TagListItem from './TagListItem';
import api from '@/utils/api';
export default {
    name: 'Tag',
    components: {
        TagLayout,
        TagList,
        TagListItem
    },
    data() {
        return {
            tagListData: []
        };
    },
    created() {
        this.getArticleTag();
    },
    methods: {
        getArticleTag() {
            const params = {
                pageSize: 1000,
                currentPage: 1
            };
            api.tagQuery(params).then((res) => {
                this.tagListData = res.data;
            });
        },
        // 关注
        handleFollow(tagId) {
            const params = {
                followId: tagId,
                type: 2
            };
            api.follow(params).then((res) => {
                this.tagListData.map((item) => {
                    if (item._id === tagId) {
                        item.isFollow = !item.isFollow;
                    }
                });
            }).catch(() => {});
        }
    }
};
</script>
