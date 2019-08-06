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
import TagLayout from './TagLayout';
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
                currentPage: 1,
                type: 0
            };
            api.tagQuery(params).then((res) => {
                this.tagListData = res.data;
            });
        },
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
            });
        }
    }
};
// db.tags.insertMany([
//     {
//         name: 'wechat-app',
//         title: '微信小程序'
//     },
//     {
//         name: 'frontend',
//         title: '前端'
//     },
//     {
//         name: 'nodejs',
//         title: 'nodejs'
//     },
//     {
//         name: 'vue',
//         title: 'vue'
//     }
// ])
</script>
