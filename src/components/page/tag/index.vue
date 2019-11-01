<template>
    <page-loading :loading="loading" :data="listData">
        <layout>
            <!-- <card slot="content" :visible-header="true" :padding="false" title="话题">
            </card> -->
            <div
                slot="content"
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
            <card slot="introduce" :visible-header="true" :padding="false" title="介绍">
                <introduce></introduce>
            </card>
        </layout>
    </page-loading>
</template>

<script>
import Layout from './Layout';
import TagItem from './TagItem';
import PageLoading from '_c/pageLoading';
import Introduce from '_c/introduce';
import Card from '_c/card';
import api from '@/utils/api';
export default {
    name: 'Tag',
    components: {
        Layout,
        TagItem,
        PageLoading,
        Introduce,
        Card
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
