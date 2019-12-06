<template>
    <card slot="content" :padding="false" :title="cardTitle" icon="icon icon-zhuanti">
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
                        placeholder="输入名称 <=50"></el-input>
                </el-form-item>
                <el-form-item
                    label="描述"
                    prop="description">
                    <el-input
                        v-model="form.description"
                        :rows="8"
                        type="textarea"
                        placeholder="输入描述 <=500"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        :loading="loading"
                        type="primary"
                        @click="handleSave('save')">{{ loading ? '稍候...' : '保存'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </card>
</template>

<script>
import { mapState } from 'vuex';
import Card from '@/components/common/card';
import { imgBaseUrl, apiBaseUrl } from '@/constants/url-config';
import api from '@/utils/api';
export default {
    name: 'TopicAddEdit',
    components: {
        Card
    },
    data() {
        return {
            form: {
                img: '',
                title: '',
                description: ''
            },
            loading: false,
            labelWidth: '90px',
            rules: {
                title: [
                    // { required: true, message: '必填' },
                    { max: 50, message: '超过最大字符限制50' }
                ],
                description: [
                    // { required: true, message: '必填' },
                    { max: 500, message: '超过最大字符限制500' }
                ]
            }
        };
    },
    computed: {
        ...mapState({
            token: state => state.token
        }),
        topicId() {
            return this.$route.params.topicId;
        },
        imageUrl() {
            return this.form.img ? `${imgBaseUrl}/${this.form.img}` : '';
        },
        actionUrl() {
            return `${apiBaseUrl}/file/single/upload`;
        },
        cardTitle() {
            return this.topicId ? '编辑专题' : '创建专题';
        },
        dataOptions() {
            return {
                type: 1,
                targetId: this.topicId
            };
        },
        headers() {
            return {
                token: this.token
            };
        }
    },
    watch: {
        '$route.params.topicId': {
            handler(n, o) {
                if (n) {
                    this.getDetail(this.topicId);
                } else {
                    this.form = {
                        img: '',
                        title: '',
                        description: ''
                    };
                };
            },
            immediate: true
        }
    },
    methods: {
        handleAvatarSuccess(response, file, fileList) {
            const { code, data } = response;
            if (code === 200) {
                this.form.img = data;
                this.handleSave();
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
        },
        handleSave(type) {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    api.topicEdit(this.topicId, { ...this.form }).then(() => {
                        this.loading = false;
                        if (type === 'save') {
                            this.$router.push(`/topic/${this.topicId}`);
                        }
                    }).catch(() => {
                        this.loading = false;
                    });
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
