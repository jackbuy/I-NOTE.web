<template>
    <layout :loading="loading" :user-list="userList">
        <card
            slot="list"
            :padding="false"
            class="card-side"
            title="私信 - 联系人">
            <div class="letter__side-user-list">
                <ul>
                    <li
                        v-for="item in userList"
                        :key="item._id"
                        :class="{'active': item._id === letterUserId}"
                        @click="handleLetter(item._id)">
                        <div class="img" :style="{backgroundImage: 'url(' + formatImg(item) + ')'}"></div>
                        <div class="title">{{ formatUser(item) }}</div>
                        <div class="new-letter" v-if="item._id === emitLetterUserId"><span>new</span></div>
                    </li>
                </ul>
            </div>
        </card>
        <card
            v-show="letterUserId"
            slot="content"
            :padding="false"
            :title="toUserName"
            class="card-content">
            <cy
                :data="letterList"
                :mine="currentUserId"></cy>
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
export default {
    name: 'Letter',
    components: {
        Layout,
        Card,
        Cy
    },
    data() {
        return {
            loading: false,
            form: {},
            userList: [], // 用户列表
            letterList: [], // 对话列表
            toUserName: '', // 与谁对话
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
        this.setEditorHeight();
        window.addEventListener('resize', this.setEditorHeight);
    },
    destroyed() {
        window.removeEventListener('resize', this.setEditorHeight);
    },
    methods: {
        // 获取聊天人员
        getLetterUser() {
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
            }).catch(() => {});
        },
        // 开启对话
        handleLetter(letterUserId, type) {
            let path = `/letter/${letterUserId}`;
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
                this.letterList = this.formatData(res.data);
                this.emitLetterUserId = '';
            });
        },
        // 发送
        handleSend() {
            const { content } = this.form;
            const params = {
                letterUserId: this.letterUserId,
                content
            };
            api.letterAdd(params).then(() => {
                this.getLetterList(this.letterUserId);
                this.form = {};
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
        // 格式化对话数据
        formatData(arr) {
            let _arr = [];
            arr.map((item) => {
                let end = utils.formatDate.time(item.createTime);
                let start = utils.formatDate.now();
                _arr.unshift({
                    ...item,
                    createTime: utils.diffDate(start, end)
                });
            });
            return _arr;
        }
    }
};
</script>
