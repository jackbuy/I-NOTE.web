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
export default {
    name: 'Tag',
    components: {
        TagLayout,
        TagList,
        TagListItem
    },
    data() {
        return {
            tagListData: [
                {
                    _id: 1,
                    name: '微信小程序'
                },
                {
                    _id: 2,
                    name: 'nodejs'
                },
                {
                    _id: 3,
                    name: '前端'
                },
                {
                    _id: 4,
                    name: '面试'
                },
                {
                    _id: 5,
                    name: '算法'
                }
            ]
        };
    }
};
</script>
