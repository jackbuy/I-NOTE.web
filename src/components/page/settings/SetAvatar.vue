<template>
    <div class="set-input">
        <div class="view">
            <div class="label">
                <div class="img">
                    <img v-if="imgUrl" :src="imgUrl" alt="">
                    <i v-else class="icon icon-yonghu"></i>
                </div>
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
import { imgBaseUrl, apiBaseUrl } from '@/constants/url-config';
import api from '@/utils/api';
export default {
    name: '',
    props: {
        prop: String,
        label: String,
        loading: Boolean
    },
    computed: {
        imgUrl() {
            return this.prop ? `${imgBaseUrl}/${this.prop}` : '';
        },
        actionUrl() {
            return `${apiBaseUrl}/uploadfile`;
        }
    },
    data() {
        return {
            headers: {
                token: localStorage.getItem('token')
            },
            dataOptions: {
                type: 1
            }
        };
    },
    methods: {
        handleAvatarSuccess(res, file) {
            const { filename } = res.data[0];
            api.deleteFile({ filename: this.prop }).then(() => {
                this.$emit('submit', {
                    [this.label]: filename
                });
            });
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
