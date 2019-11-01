<template>
    <div class="topic">
        <div class="topic__content">
            <slot name="content"></slot>
        </div>
        <div class="topic__side">
            <div class="fixed">
                <slot name="introduce"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Topic'
};
</script>
