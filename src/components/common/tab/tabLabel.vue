<template>
    <span :class="{'active': name === activeName.name}" @click="handleClick">{{ label }}</span>
</template>

<script>
export default {
    name: '',
    props: {
        name: String,
        label: String
    },
    inject: ['activeName'],
    methods: {
        handleClick() {
            this.$parent.tabClick(this.name);
        }
    }
};
</script>
