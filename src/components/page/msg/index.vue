<template>
    <msg-layout>
        <msg-support slot="content" :data="msgData"></msg-support>
    </msg-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { MESSAGE_QUERY } from '@/store/mutation-types';
import MsgLayout from './layout';
import MsgSupport from './src/MsgSupport';
export default {
    name: 'MsgCenter',
    components: {
        MsgLayout,
        MsgSupport
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
