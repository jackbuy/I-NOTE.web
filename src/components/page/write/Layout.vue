<template>
    <page-loading :loading="pageLoading">
        <template v-if="isHas">
            <div v-show="!presentation" class="write">
                <div v-show="!toggle" class="write__side">
                    <slot name="side"></slot>
                </div>
                <div
                    class="write__content"
                    :class="{'auto': presentation}">
                    <slot name="content"></slot>
                    <div
                        :class="{'active': toggle}"
                        class="toggle-btn"
                        title="展开/收起列表"
                        @click="handleToggle">
                        <i v-if="!toggle" class="icon icon-jiantou-left"></i>
                        <i v-else class="icon icon-jiantou-right"></i>
                    </div>
                </div>
            </div>
            <div v-if="presentation" class="pre-view">
                <slot name="presentation"></slot>
            </div>
        </template>
        <div v-else class="no-has">文章不存在</div>
    </page-loading>
</template>

<script>
import PageLoading from '_c/pageLoading';
export default {
    name: 'Layout',
    props: {
        presentation: Boolean,
        isHas: Boolean,
        pageLoading: Boolean
    },
    components: {
        PageLoading
    },
    data() {
        return {
            toggle: false
        };
    },
    methods: {
        handleToggle() {
            this.toggle = !this.toggle;
        }
    }
};
</script>
