<template>
    <msg-layout>
        <msg-list slot="content" :data="msgData"></msg-list>
    </msg-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { MESSAGE_QUERY } from '@/store/mutation-types';
import MsgLayout from './MsgLayout';
import MsgList from './src/MsgList';
export default {
    name: 'MsgCenter',
    components: {
        MsgLayout,
        MsgList
    },
    computed: {
        ...mapState({
            msgData: state => state.msgData
        })
    },
    created() {
        this.messageQuery();
    },
    methods: {
        ...mapActions({
            messageQuery: MESSAGE_QUERY
        })
    }
};
</script>
