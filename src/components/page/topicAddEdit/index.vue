<template>
    <div class="topic-add">
        <el-form
            ref="form"
            :model="form">
            <el-form-item
                label="名称">
                <el-input
                    v-model="form.title"
                    placeholder="输入名称"></el-input>
            </el-form-item>
            <el-form-item
                label="描述">
                <el-input
                    v-model="form.description"
                    type="textarea"
                    placeholder="输入描述"></el-input>
            </el-form-item>
            <el-form-item
                label="封面URL">
                <el-input
                    v-model="form.img"
                    placeholder="输入封面URL"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    type="primary"
                    @click="handleSave">创建专题</el-button>
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
            form: {}
        };
    },
    methods: {
        handleSave() {
            api.topicAdd({ ...this.form }).then(() => {
                this.$router.push('/topic');
            });
        }
    }
};
</script>
