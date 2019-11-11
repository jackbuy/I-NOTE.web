<template>
    <el-carousel
        v-if="value"
        :interval="4000"
        arrow="never"
        height="149px"
        class="introduce">
        <el-carousel-item>
            <div class="title"><span>I`NOTE</span>知识分享与交流社区</div>
            <div class="des">觉得有 <i>疑惑</i>？</div>
            <div class="des">发个话题和大家一起 <i>讨论</i>！</div>
            <div class="btn" @click="handleGoPath('/write')">发话题 <em class="icon icon-jiantou-right"></em></div>
        </el-carousel-item>
        <el-carousel-item>
            <div class="title"><span>I`NOTE</span>知识分享与交流社区</div>
            <div class="des">有丰富的 <i>经验</i>？</div>
            <div class="des">不妨 <i>分享</i>出来！</div>
            <div class="btn" @click="handleGoPath('/write')">写文章 <em class="icon icon-jiantou-right"></em></div>
        </el-carousel-item>
        <el-carousel-item>
            <div class="title"><span>I`NOTE</span>知识分享与交流社区</div>
            <div class="des">知识点 <i>太多</i>？</div>
            <div class="des">把文章加入 <i>专题</i>！</div>
            <div class="btn" @click="handleGoPath(`/zone/${currentUserId}/topic`)">创建专题 <em class="icon icon-jiantou-right"></em></div>
        </el-carousel-item>
        <el-carousel-item>
            <div class="title"><span>I`NOTE</span>知识分享与交流社区</div>
            <div class="des">对系统交互有 <i>意见</i>？</div>
            <div class="des"><i>提</i>出来！</div>
            <div class="btn" @click="handleGoPath('/write')">意见反馈 <em class="icon icon-jiantou-right"></em></div>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import {
    TOGGLE_LOGIN_MODAL
} from '@/store/mutation-types';
export default {
    name: '',
    props: {
        value: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'isLogin',
            currentUserId: 'currentUserId'
        })
    },
    methods: {
        ...mapMutations({
            toggleLoginModal: TOGGLE_LOGIN_MODAL
        }),
        handleGoPath(path) {
            if (this.isLogin) {
                if (path === '/write') {
                    this.handleRouterReplace(path);
                } else {
                    this.handleRouterPush(path);
                }
            } else {
                this.handleLog('login');
            }
        },
        handleRouterPush(path) {
            this.$router.push(path);
        },
        handleRouterReplace(path) {
            this.$router.replace(path);
        },
        handleLog(type) {
            this.toggleLoginModal({
                open: true,
                type
            });
        }
    }
};
</script>
