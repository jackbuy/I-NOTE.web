<template>
    <div>
        <div v-show="userList.length > 0" class="letter">
            <div class="letter__side">
                <slot name="list"></slot>
            </div>
            <div class="letter__content">
                <slot name="content"></slot>
            </div>
        </div>
        <div v-show="userList.length === 0" class="no-has">暂无私信！</div>
    </div>
</template>

<script>
export default {
    props: {
        userList: Array
    }
};
</script>
