<template>
    <div class="card">
        <div v-if="!visibleHeader" class="card__title">
            <div class="tit"><i v-if="icon" :class="icon"></i>{{ title }}</div>
            <slot name="menu"></slot>
        </div>
        <div
            class="card__content"
            :class="{'padding': padding}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        title: {
            type: String,
            default: ''
        },
        icon: String,
        visibleHeader: {
            type: Boolean,
            default: false
        },
        padding: {
            type: Boolean,
            default: true
        }
    }
};
</script>
