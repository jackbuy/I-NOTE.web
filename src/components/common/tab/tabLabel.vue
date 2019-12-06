<template>
    <span :class="{'active': name === activeName.name, 'divided': divided}" @click="handleClick">{{ label }}</span>
</template>

<script>
export default {
    name: '',
    props: {
        name: String,
        label: String,
        divided: Boolean
    },
    inject: ['activeName'],
    methods: {
        handleClick() {
            this.$parent.tabClick(this.name);
        }
    }
};
</script>
