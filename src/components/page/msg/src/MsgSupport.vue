<template>
    <div class="list">
        <template v-if="data.length > 0">
            <msg-support-item
                v-for="item in data"
                :key="item._id"
                :data="item">
            </msg-support-item>
        </template>
        <template v-else>
            <div class="norecord">暂无消息！</div>
        </template>
    </div>
</template>

<script>
import MsgSupportItem from './MsgSupportItem';
export default {
    name: '',
    components: {
        MsgSupportItem
    },
    props: {
        data: {
            type: Array,
            default: () => ([])
        }
    }
};
</script>
