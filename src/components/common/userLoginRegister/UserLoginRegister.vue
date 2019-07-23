<template>
    <modal
        :visible="true">
        <div>login/register</div>
    </modal>
</template>

<script>
import Modal from '@/components/common/modal/Modal';
export default {
    name: 'UserLoginRegister',
    // props: {
    //     visible
    // },
    components: {
        Modal
    }
};
</script>
