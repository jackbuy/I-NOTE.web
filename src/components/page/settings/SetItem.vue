<template>
    <div class="settings-item">
        <div class="header">{{ title }}</div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        title: String
    }
};
</script>
