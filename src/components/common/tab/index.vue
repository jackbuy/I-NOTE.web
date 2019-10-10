<template>
    <div class="tab">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        activeName: String
    },
    data() {
        return {
            name: this.activeName
        };
    },
    provide() {
        return {
            activeName: this.$data
        };
    },
    methods: {
        tabClick(activeName) {
            this.name = activeName;
            this.$emit('tabClick', activeName);
        }
    }
};

</script>
