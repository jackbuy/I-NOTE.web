<template>
    <div class="layout__header-logo" @click="handleRoutePush">
        <img src="../../../../assets/imgs/inote_logo_beta.png" alt="">
        <!-- <img src="../../../../assets/imgs/logo.jpg" alt=""> -->
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
