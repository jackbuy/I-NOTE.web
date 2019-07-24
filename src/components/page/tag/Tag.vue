<template>
    <tag-layout>
        <tag-list slot="list">
            <tag-list-item
                v-for="item in tagListData"
                :key="item._id"
                :item="item">
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
            api.tagQuery().then((res) => {
                this.tagListData = res.data;
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
