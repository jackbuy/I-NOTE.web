<template>
    <div class="letter__content-letter-list">
        <ul>
            <li
                v-for="item in data"
                :key="item._id">
                <div class="time">{{ item.createTime }}</div>
                <div :class="{'mine': item.userId === mine}">
                    <span>{{ item.content }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => []
        },
        mine: String
    },
    watch: {
        data: {
            handler(n, o) {
                if (n && n !== o) {
                    this.$nextTick(() => {
                        this.autoScrollToBottom();
                    });
                }
            },
            immediate: true
        }
    },
    methods: {
        autoScrollToBottom() {
            const scrollDom = document.querySelector('.letter__content-letter-list');
            // scrollDom.style.height = window.innerHeight - 164 - 80 + 'px';
            scrollDom.scrollTop = scrollDom.scrollHeight;
        }
    }
};
</script>

<style>
.i-content{
    overflow: hidden;
    overflow-y: auto;
    height: 60px;
}
</style>
