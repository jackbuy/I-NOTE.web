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
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
};
</script>
