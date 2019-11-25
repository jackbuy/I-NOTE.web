<template>
    <layout :loading="loading">
        <card slot="list" :padding="false" class="fixed mb0" title="联系人">
            <div class="letter__side-user-list">
                <ul>
                    <li
                        v-for="item in userList"
                        :key="item._id"
                        :class="{'active': item.toUserId._id === userId || item.fromUserId._id === userId}"
                        @click="handleLetter(item.toUserId._id === currentUserId ? item.fromUserId._id : item.toUserId._id)">
                        <div class="title">{{ item.toUserId._id === currentUserId ? item.fromUserId.nickname : item.toUserId.nickname }}</div>
                        <div class="new-letter" v-if="item._id === emitLetterUserId"><span>new</span></div>
                    </li>
                </ul>
            </div>
        </card>
        <card v-if="userId" slot="content" :padding="false" class="mb0" title="对话">
            <div class="letter__content-letter-list">
                <ul>
                    <li
                        v-for="item in letterList"
                        :key="item._id">
                        <div :class="{'mine': item.userId === currentUserId}">
                            <span>{{ item.content }}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="letter__content-letter-input">
                <el-input
                    v-model="form.content"
                    type="textarea"
                    placeholder="对话内容">
                </el-input>
                <el-button
                    type="primary"
                    @click="handleSend">
                    发送
                </el-button>
            </div>
        </card>
    </layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
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
            form: {},
            userList: [],
            letterList: [],
            // toUser: {},
            letterUserId: '', // 用户对话ID
            emitLetterUserId: '' // 新消息触发用户对话ID
        };
    },
    computed: {
        ...mapState({
            socketLetter: state => state.socketLetter
        }),
        ...mapGetters({
            currentUserId: 'currentUserId'
        }),
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
                this.letterUserAdd(n);
            },
            immediate: true
        },
        socketLetter: {
            handler(n, o) {
                const { type, data } = n;
                if (type && data) {
                    const { letterUserId } = data;
                    this.emitLetterUserId = letterUserId;
                    if (letterUserId === this.letterUserId) {
                        this.getLetterList(letterUserId);
                    }
                }
            },
            immediate: true
        }
    },
    mounted() {
        if (!this.userId) {
            this.getLetterUser();
        }
    },
    methods: {
        // 获取聊天人员
        getLetterUser() {
            api.letterUserQuery().then((res) => {
                this.userList = res.data;
            }).catch(() => {
            });
        },
        // 检查人员
        letterUserAdd(toUserId) {
            api.letterUserAdd(toUserId).then((res) => {
                const { _id } = res.data;
                this.letterUserId = _id;
                this.getLetterUser();
                this.getLetterList(_id);
            }).catch(() => {
            });
        },
        // 开启对话
        handleLetter(toUserId) {
            // const { toUserId, fromUserId } = item;
            // this.fromUser = fromUserId;
            // this.toUser = toUserId;
            // const { _id } = toUserId;

            let path = `/letter/${toUserId}`;
            this.$router.push(path).catch(() => {});
        },
        // 获取对话内容
        getLetterList(letterUserId) {
            const params = {
                letterUserId
            };
            api.letterQuery(params).then((res) => {
                this.letterList = res.data;
                this.emitLetterUserId = '';
            });
        },
        // 新增对话
        letterAdd(content) {
            const params = {
                letterUserId: this.letterUserId,
                content
            };
            api.letterAdd(params).then(() => {
                this.getLetterList(this.letterUserId);
            });
        },
        // 发送
        handleSend() {
            const { content } = this.form;
            this.letterAdd(content);
            this.getLetterList(this.letterUserId);
            this.form = {};
        }
    }
};
</script>
