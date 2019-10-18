<template>
    <div>
        <el-button
            @click="handleReload">刷新</el-button>
    </div>
</template>

<script>
export default {
    name: "ReloadButton",
    methods: {
        handleReload() {
            this.$emit('reload');
        }
    }
};
</script>
