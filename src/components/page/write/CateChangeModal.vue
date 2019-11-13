<template>
    <modal
        :title="modelTitle"
        :visible="isVisible"
        @handleClose="handleClose">
        <div class="change-article-cate">
            <ul>
                <li
                    v-for="item in dataList"
                    :key="item._id"
                    :class="{'active': formatActiveCate(item._id)}"
                    @click="handleChange(item._id)">
                    <i class="icon icon-xuanze"></i>
                    {{ item.title }}
                </li>
            </ul>
        </div>
        <!-- <el-button
            :disabled="!form.title"
            class="mt15"
            size="mini"
            style="width: 100%"
            type="primary"
            @click="handleChange">确定</el-button> -->
    </modal>
</template>

<script>
import Modal from '@/components/common/modal';
export default {
    name: 'CateModal',
    components: {
        Modal
    },
    props: {
        value: Boolean,
        cateId: String,
        data: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            form: {
                title: this.title
            }
        };
    },
    computed: {
        isVisible() {
            return this.value;
        },
        modelTitle() {
            return '更改分组';
        },
        dataList() {
            let arr = [];
            this.data.map((item) => {
                if (item._id !== 'all') {
                    arr.push(item);
                }
            });
            return arr;
        }
    },
    methods: {
        handleClose() {
            this.$emit('input', false);
        },
        handleChange(cateId) {
            this.$emit('change', cateId);
            this.handleClose();
        },
        formatActiveCate(cateId) {
            if (this.cateId) {
                if (this.cateId === cateId) return true;
            } else {
                if (cateId === 'no-cate') return true;
            }
        }
    }
};
</script>

<style>
.width100{
    width: 100%;
}
</style>
