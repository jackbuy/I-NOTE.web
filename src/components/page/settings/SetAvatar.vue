<template>
    <div class="set-input">
        <div class="view">
            <div class="label">
                <el-avatar v-if="imgUrl" :size="50" :src="imgUrl"></el-avatar>
                <el-avatar v-else :size="50"><i class="icon icon-yonghu"></i></el-avatar>
            </div>
            <div class="menu">
                <el-upload
                    class="avatar-uploader"
                    :action="actionUrl"
                    :headers="headers"
                    :data="dataOptions"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <span>修改</span>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { imgBaseUrl, apiBaseUrl } from '@/constants/url-config';
// import api from '@/utils/api';
export default {
    name: '',
    props: {
        prop: String,
        label: String,
        loading: Boolean
    },
    computed: {
        ...mapState({
            token: state => state.token
        }),
        imgUrl() {
            return this.prop ? `${imgBaseUrl}/${this.prop}` : '';
        },
        actionUrl() {
            return `${apiBaseUrl}/file/single/upload`;
        },
        dataOptions() {
            return {
                type: 2
            };
        },
        headers() {
            return {
                token: this.token
            };
        }
    },
    methods: {
        handleAvatarSuccess(response, file, fileList) {
            const { code, data } = response;
            if (code === 200) {
                this.$emit('submit', {
                    [this.label]: data
                });
            }
        },
        beforeAvatarUpload(file) {
            const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 1;

            if (!isImg) {
                this.$message.error('上传头像图片只能是 JPG或png 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isImg && isLt2M;
        }
    }
};
</script>
