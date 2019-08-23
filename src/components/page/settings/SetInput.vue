<template>
    <div class="set-input">
        <div v-if="!isEdit" class="view">
            <div class="label">{{ labelName }}</div>
            <div class="menu">
                <span @click="handleEdit(prop)">修改</span>
            </div>
        </div>
        <div v-else class="set">
            <div class="label">
                <input
                    v-model="data"
                    :placeholder="placeholder"/>
            </div>
            <div class="menu">
                <span :class="{'disable': loading}" @click="handleSubmit()">提交</span>
                <span class="cancel" @click="handleCancel">取消</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        prop: String,
        label: String,
        placeholder: String,
        loading: Boolean
    },
    data() {
        return {
            isEdit: false,
            data: ''
        };
    },
    computed: {
        labelName() {
            return this.prop ? this.prop : '暂无';
        }
    },
    methods: {
        handleEdit(data) {
            this.isEdit = true;
            this.data = data;
        },
        handleCancel() {
            this.isEdit = false;
        },
        handleSubmit() {
            if (!this.loading) {
                this.isEdit = false;
                this.$emit('submit', {
                    [this.label]: this.data
                });
            }
        }
    }
};
</script>
