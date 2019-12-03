<template>
    <layout :loading="loading" :user-list="userList">
        <card slot="list" :padding="false" class="fixed mb0" title="联系人">
            <div class="letter__side-user-list">
                <ul>
                    <li
                        v-for="item in userList"
                        :key="item._id"
                        :class="{'active': item.toUserId._id === userId || item.fromUserId._id === userId}"
                        @click="handleLetter(item)">
                        <div class="title">{{ item.toUserId._id === currentUserId ? item.fromUserId.nickname : item.toUserId.nickname }}</div>
                        <div class="new-letter" v-if="item._id === emitLetterUserId"><span>new</span></div>
                    </li>
                </ul>
            </div>
        </card>
        <card v-if="userId" slot="content" :padding="false" class="mb0" :title="`与 ${toUser.nickname} 对话`">
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
                    :rows="5"
                    type="textarea"
                    placeholder="输入内容( 回车发送 )"
                    @keyup.enter.native="handleSend">
                </el-input>
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
            userList: [], // 用户列表
            letterList: [], // 对话列表
            toUser: {}, // 与谁对话
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
                if (!n) {
                    this.getLetterUser();
                } else {
                    if (n === o) return;
                    this.letterUserAdd(n);
                }
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
    methods: {
        // 获取聊天人员
        getLetterUser() {
            api.letterUserQuery().then((res) => {
                this.userList = res.data;
                if (!this.letterUserId && this.userList.length > 0) {
                    this.getLetterList(this.userList[0]._id);
                    this.handleLetter(this.userList[0], 'replace');
                }
                if (this.letterUserId) {
                    let letterUser = {};
                    this.userList.map((item) => {
                        if (item._id === this.letterUserId) letterUser = item;
                    });
                    this.toUser = letterUser.toUserId._id === this.currentUserId ? letterUser.fromUserId : letterUser.toUserId;
                }
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
        handleLetter(item, type) {
            const toUserId = item.toUserId._id === this.currentUserId ? item.fromUserId._id : item.toUserId._id;

            this.toUser = item.toUserId._id === this.currentUserId ? item.fromUserId : item.toUserId;

            let path = `/letter/${toUserId}`;
            if (type && type === 'replace') {
                this.$router.replace(path).catch(() => {});
            } else {
                this.$router.push(path).catch(() => {});
            }
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
