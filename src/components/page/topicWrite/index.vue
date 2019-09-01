<template>
    <div class="topic-write">
        <el-form
            ref="form"
            :model="form"
            :rules="rules">
            <el-form-item
                label="名称"
                prop="title">
                <el-input
                    v-model="form.title"
                    placeholder="输入名称"></el-input>
            </el-form-item>
            <el-form-item
                label="描述">
                <el-input
                    v-model="form.description"
                    :rows="5"
                    type="textarea"
                    placeholder="输入描述"></el-input>
            </el-form-item>
            <el-form-item
                label="封面URL">
                <el-input
                    v-model="form.img"
                    :rows="4"
                    type="textarea"
                    placeholder="输入封面URL"></el-input>
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
import api from '@/utils/api';
export default {
    name: 'TopicAddEdit',
    data() {
        return {
            form: {},
            loading: false,
            rules: {
                title: [
                    { required: true, message: '必填' }
                ]
            }
        };
    },
    computed: {
        topicId() {
            return this.$route.params.topicId;
        }
    },
    created() {
        if (this.topicId) this.getDetail(this.topicId);
    },
    methods: {
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
