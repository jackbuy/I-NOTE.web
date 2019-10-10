<template>
    <div class="layout__header-logo" @click="handleRoutePush">
        <img src="../../../../../static/logo/inote_logo_beta.png" alt="">
    </div>
</template>

<script>
export default {
    name: 'LayoutHeaderLogo',
    methods: {
        handleRoutePush() {
            this.$router.push('/').catch(() => {});
        }
    }
};
</script>
