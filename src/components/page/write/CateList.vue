<template>
    <div class="cate-list">
        <div class="cate-list__title">默认分组</div>
        <ul class="cate-list__content">
            <li
                v-for="item in defaultCate"
                :key="item._id"
                :class="{'active': cateId === item._id}">
                <div
                    class="li">
                    <div
                        class="tit"
                        @click="handleCate(item)">
                        <i class="cate icon icon-wenjianjia"></i>
                        {{ item.title }}
                    </div>
                </div>
            </li>
        </ul>
        <div class="cate-list__title">我的分组</div>
        <ul class="cate-list__content">
            <li
                v-for="item in myCate"
                :key="item._id"
                :class="{'active': cateId === item._id}">
                <div
                    class="li">
                    <div
                        class="tit"
                        @click="handleCate(item)">
                        <i class="cate icon icon-wenjianjia"></i>
                        {{ item.title }}
                    </div>
                    <div v-if="cateId === item._id && item.type !== 'default'" class="menu">
                        <el-dropdown
                            @command="handleCommand">
                            <i class="icon icon-gengduo"></i>
                            <el-dropdown-menu class="write-dropdown-menu">
                                <el-dropdown-item
                                    :command="composeValue('edit', item)"
                                    icon="el-icon-delete">编辑</el-dropdown-item>
                                <!-- <el-dropdown-item
                                    :command="composeValue('del', item._id)"
                                    divided
                                    icon="el-icon-delete">删除</el-dropdown-item> -->
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'CateList',
    props: {
        cateId: String,
        data: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        defaultCate() {
            let arr = [];
            this.data.map((item) => {
                if (item.type === 'default') {
                    arr.push(item);
                }
            });
            return arr;
        },
        myCate() {
            let arr = [];
            this.data.map((item) => {
                if (!item.type) {
                    arr.push(item);
                }
            });
            return arr;
        }
    },
    methods: {
        handleCate(cate) {
            this.$emit('change', cate);
        },
        // action
        handleCommand(command) {
            const { type, data } = command;
            this.$emit(type, data);
        },
        composeValue(type, data) {
            return {
                type,
                data
            };
        }
    }
};
</script>
