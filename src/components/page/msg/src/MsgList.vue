<template>
    <div class="list">
        <template v-if="data.length > 0">
            <msg-list-item
                v-for="item in data"
                :key="item._id"
                :data="item">
            </msg-list-item>
        </template>
        <template v-else>
            <div class="norecord">暂无消息！</div>
        </template>
    </div>
</template>

<script>
import MsgListItem from './MsgListItem';
export default {
    name: '',
    components: {
        MsgListItem
    },
    props: {
        data: {
            type: Array,
            default: () => ([])
        }
    }
};
</script>
