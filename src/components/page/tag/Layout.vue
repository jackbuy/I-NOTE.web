<template>
    <div class="tag">
        <div class="tag__content">
            <slot name="content"></slot>
        </div>
        <!-- <div class="tag__side">
            <div class="fixed">
                <slot name="introduce"></slot>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'Tag'
};
</script>
