<template>
    <layout :loading="loading">
        <card slot="list" :padding="false" class="fixed mb0" title="联系人">
            <div class="letter__side-user-list">
                <ul>
                    <li>34534</li>
                </ul>
            </div>
        </card>
        <card slot="content" :padding="false" class="mb0" title="与 阿萨德 对话">
            <div class="letter__content-letter-list">
                <ul>
                    <li>ewfwef</li>
                </ul>
            </div>
            <div class="letter__content-letter-input">
                输入框
            </div>
        </card>
    </layout>
</template>

<script>
import Layout from './Layout';
import Card from '_c/card';
import api from '@/utils/api';
// import utils from '@/utils/utils';
export default {
    name: 'Letter',
    components: {
        Layout,
        Card
    },
    data() {
        return {
            loading: false,
            userList: []
        };
    },
    computed: {
        userId() {
            return this.$route.params.userId;
        }
        // time() {
        //     if (this.detail && this.detail.publishTime) {
        //         let time = this.detail.publishTime;
        //         let end = utils.formatDate.time(time);
        //         let start = utils.formatDate.now();
        //         return `${utils.diffDate(start, end)}`;
        //     }
        // }
    },
    watch: {
        userId: {
            handler(n, o) {
                if (n === o) return;
                console.log(n);
                // this.getLetterUser(n);
                // this.getLetterList(n);
            },
            immediate: true
        }
    },
    methods: {
        getLetterUser(userId) {
            this.loading = true;
            api.getLetterUser().then((res) => {
                this.userList = res.data;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        getLetterList(userId) {
            this.loading = true;
            api.getLetterList().then((res) => {
                this.userList = res.data;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        }
    }
};
</script>
