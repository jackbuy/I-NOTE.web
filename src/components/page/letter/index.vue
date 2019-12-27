<template>
    <layout :user-list="userList">
        <card
            slot="list"
            :padding="false"
            class="card-side"
            title="私信">
            <div class="letter__side-user-list">
                <ul>
                    <li
                        v-for="item in userList"
                        :key="item._id"
                        :class="{'active': item._id === letterUserId}"
                        @click="handleLetter(item._id)">
                        <div class="img" :style="{backgroundImage: 'url(' + formatImg(item) + ')'}">
                            <span v-if="formatUnreadCount(item) > 0">{{ formatUnreadCount(item) }}</span>
                        </div>
                        <div class="title">{{ formatUser(item) }}</div>
                    </li>
                </ul>
            </div>
        </card>
        <card
            v-loading="detailLoading"
            slot="content"
            :padding="false"
            :title="toUserName"
            class="card-content">
            <cy
                :data="letterList"
                :mine="currentUserId">
            </cy>
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
import Cy from './Content';
import api from '@/utils/api';
import { imgBaseUrl } from '@/constants/url-config';
import utils from '@/utils/utils';
import message from '@/mixins/message';
export default {
    name: 'Letter',
    components: {
        Layout,
        Card,
        Cy
    },
    mixins: [ message ],
    data() {
        return {
            loading: false,
            detailLoading: false,
            form: {},
            userList: [], // 用户列表
            letterList: [], // 对话列表
            toUserName: '' // 与谁对话
        };
    },
    computed: {
        ...mapState({
            socketLetter: state => state.socketLetter
        }),
        ...mapGetters({
            currentUserId: 'currentUserId'
        }),
        letterUserId() {
            return this.$route.params.letterUserId;
        }
    },
    watch: {
        letterUserId: {
            handler(n, o) {
                this.getLetterUser();
            },
            immediate: true
        },
        socketLetter: {
            handler(n, o) {
                const { type, data } = n;
                if (type && data) {
                    const { letterUserId } = data;
                    if (letterUserId === this.letterUserId) {
                        api.letterUserClearCount({ letterUserId }).then(() => {
                            this.getLetterList(letterUserId);
                        });
                    } else {
                        api.letterUserQuery().then((res) => {
                            this.userList = res.data;
                        });
                    }
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.setEditorHeight();
        window.addEventListener('resize', this.setEditorHeight);
    },
    destroyed() {
        window.removeEventListener('resize', this.setEditorHeight);
    },
    methods: {
        // 获取聊天人员
        getLetterUser() {
            this.loading = true;
            api.letterUserQuery().then((res) => {
                this.userList = res.data;
                if (!this.letterUserId) {
                    if (this.userList && this.userList.length > 0) {
                        this.getLetterList(this.userList[0]._id);
                        this.handleLetter(this.userList[0]._id, 'replace');
                    }
                } else {
                    this.getLetterList(this.letterUserId);
                    this.userList.map((item) => {
                        if (item._id === this.letterUserId) this.toUserName = this.formatUser(item);
                    });
                }
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
        // 开启对话
        handleLetter(letterUserId, type) {
            api.letterUserClearCount({ letterUserId }).then(() => {
                let path = `/letter/${letterUserId}`;
                if (type && type === 'replace') {
                    this.$router.replace(path).catch(() => {});
                } else {
                    this.$router.push(path).catch(() => {});
                }
            });
        },
        // 获取对话内容
        getLetterList(letterUserId) {
            const params = {
                letterUserId
            };
            this.detailLoading = true;
            api.letterQuery(params).then((res) => {
                this.letterList = this.formatData(res.data);
                this.form = {};
                this.detailLoading = false;
            }).catch(() => {
                this.detailLoading = false;
            });
        },
        // 发送
        handleSend() {
            const { content } = this.form;
            if (utils.trim(content).length === 0) {
                this.form = {};
                this.showWarningMsg('不能发送空信息！');
                return;
            }
            const params = {
                letterUserId: this.letterUserId,
                content
            };
            api.letterAdd(params).then(() => {
                this.getLetterList(this.letterUserId);
            }).catch(() => {});
        },
        // 设置编辑器高度
        setEditorHeight() {
            const side = document.querySelector('.card-side');
            side.style.height = window.innerHeight - 80 + 'px';

            const content = document.querySelector('.card-content');
            content.style.height = window.innerHeight - 80 + 'px';

            this.setH();
        },
        setH() {
            const editor = document.querySelector('.letter__content-letter-list');
            if (editor) editor.style.height = window.innerHeight - 164 - 80 + 'px';
        },
        // 格式化用户头像
        formatImg(item) {
            return item.toUserId._id === this.currentUserId ? `${imgBaseUrl}/${item.fromUserId.avatar}` : `${imgBaseUrl}/${item.toUserId.avatar}`;
        },
        // 格式化用户名
        formatUser(item) {
            return item.toUserId._id === this.currentUserId ? item.fromUserId.nickname : item.toUserId.nickname;
        },
        formatUnreadCount(item) {
            return item.toUserId._id === this.currentUserId ? item.toUserUnreadCount : item.fromUserUnreadCount;
        },
        // 格式化对话数据
        formatData(arr) {
            let lastItem = null;
            let _arr = [];
            arr.map((item) => {
                let end = utils.formatDate.time(item.createTime);
                let start = utils.formatDate.now();
                let createAt = null;
                // 过滤1分钟内的时间
                if (!lastItem || new Date(lastItem.createTime).getTime() - new Date(item.createTime).getTime() > 1000 * 60 * 1) {
                    createAt = utils.diffDate(start, end);
                    lastItem = item;
                }
                _arr.unshift({
                    ...item,
                    createAt
                });
            });
            return _arr;
        }
    }
};
</script>
