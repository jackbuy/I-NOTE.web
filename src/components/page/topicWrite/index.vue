<template>
    <div class="topic-write">
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            :label-width="labelWidth">
            <el-form-item
                label="专题封面">
                <el-upload
                    class="avatar-uploader"
                    :action="actionUrl"
                    :headers="headers"
                    :data="dataOptions"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <input v-model="form.img" type="hidden">
            </el-form-item>
            <el-form-item
                label="名称"
                prop="title">
                <el-input
                    v-model="form.title"
                    placeholder="输入名称 <=20"></el-input>
            </el-form-item>
            <el-form-item
                label="描述"
                prop="description">
                <el-input
                    v-model="form.description"
                    :rows="4"
                    type="textarea"
                    placeholder="输入描述 <=200"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    :loading="loading"
                    type="primary"
                    @click="handleSave">{{ loading ? '稍候...' : '保存'}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { imgBaseUrl, apiBaseUrl } from '@/constants/url-config';
import api from '@/utils/api';
export default {
    name: 'TopicAddEdit',
    data() {
        return {
            form: {
                img: '',
                title: '',
                description: ''
            },
            loading: false,
            labelWidth: '90px',
            headers: {
                token: localStorage.getItem('token')
            },
            dataOptions: {
                type: 2
            },
            rules: {
                title: [
                    // { required: true, message: '必填' },
                    { max: 20, message: '超过最大字符限制20' }
                ],
                description: [
                    // { required: true, message: '必填' },
                    { max: 200, message: '超过最大字符限制200' }
                ]
            }
        };
    },
    computed: {
        topicId() {
            return this.$route.params.topicId;
        },
        imageUrl() {
            return this.form.img ? `${imgBaseUrl}/${this.form.img}` : '';
        },
        actionUrl() {
            return `${apiBaseUrl}/uploadfile`;
        }
    },
    created() {
        if (this.topicId) this.getDetail(this.topicId);
    },
    methods: {
        handleAvatarSuccess(res, file) {
            const { filename } = res.data[0];
            api.deleteFile({ filename: this.form.img }).then(() => {
                this.form.img = filename;
                this.handleSave();
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
        },
        handleSave() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    if (this.topicId) {
                        api.topicEdit(this.topicId, { ...this.form }).then(() => {
                            this.loading = false;
                        }).catch(() => {
                            this.loading = false;
                        });
                    } else {
                        api.topicAdd({ ...this.form }).then((res) => {
                            const { topicId } = res.data;
                            this.$router.push(`/topicWrite/${topicId}`).catch(() => {});
                            this.loading = false;
                        }).catch(() => {
                            this.loading = false;
                        });
                    }
                }
            });
        },
        getDetail(topicId) {
            this.loading = true;
            api.topicDetail({ topicId }).then((res) => {
                const { title, description, img } = res.data;
                this.form = {
                    title,
                    description,
                    img
                };
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        }
    }
};
</script>

<style lang="less">
    @import './layout.less';
</style>
