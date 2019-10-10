<template>
    <div
        class="w-editor">
        <div class="toolbar">
        </div>
        <div class="text" :style="{height: this.textH}">
        </div>
    </div>
</template>
<script>
import E from 'wangeditor';
import { apiBaseUrl } from '@/constants/url-config';
export default {
    name: 'RichEdiotr',
    props: {
        // imageUrl: String,
        value: {
            type: String,
            default: ''
        },
        menus: {
            type: Array,
            default: () => [
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'image', // 插入图片
                'table', // 表格
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'justify', // 对齐方式
                'list', // 列表
                'undo', // 撤销
                'redo', // 重复
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'link', // 插入链接
                'quote', // 引用
                'emoticon', // 表情
                'video', // 插入视频
                'code' // 插入代码
            ]
        },
        uploadUrl: {
            type: String,
            default: `${apiBaseUrl}/single/uploadfile`
        },
        textH: {
            type: String,
            default: '300px'
        }
    },
    data() {
        return {
            editor: null
        };
    },
    watch: {
        value(val) {
            this.editor.txt.html(val || '');
            this.$emit('change', val);
        }
    },
    mounted() {
        this.initEditor();
        // this.linkActivable();
        this.limtTableRowCol();
    },
    methods: {
        clearEditor() {
            this.editor.txt.html('');
        },
        initEditor() {
            const toolbar = this.$el.querySelector('.toolbar');
            const text = this.$el.querySelector('.text');
            this.editor = new E(toolbar, text);
            this.editor.customConfig.zIndex = 999;
            this.editor.customConfig.uploadImgServer = this.uploadUrl;
            let token = window.localStorage.getItem('token');
            this.editor.customConfig.uploadImgHeaders = {
                token
            };
            this.editor.customConfig.uploadFileName = 'files';
            // this.editor.customConfig.uploadImgHooks = {
            //     customInsert: function(insertImg, result, editor) {
            //         const url = `${window.config.fileLoadServer}/${result.data.groupName}/${result.data.location}`;
            //         insertImg(url);
            //     }
            // };
            this.editor.customConfig.onchange = (html) => {
                this.$emit('input', html);
            };
            if (Array.isArray(this.menus)) {
                this.editor.customConfig.menus = this.menus;
            }
            this.editor.create();
            // this.editor.txt.html(this.value);
        },
        // 让链接可访问（wangEditor编辑状态链接默认不可访问）
        // linkActivable() {
        //     const text = this.$el.querySelector('.text');
        //     text.addEventListener('click', (e) => {
        //         let href = e.target.getAttribute('href');
        //         if (href) {
        //             if (!/^https?:\/\//.test(href)) {
        //                 href = `http://${href}`;
        //             }
        //             window.open(href);
        //         };
        //     });
        // },
        // 限制可插入表格行(100)和列(50)
        limtTableRowCol() {
            try {
                const tableIcon = this.$el.querySelector('.w-e-icon-table2').parentNode;
                tableIcon.addEventListener('click', (e) => {
                    setTimeout(() => {
                        const pc = this.$el.querySelector('.w-e-panel-container');
                        const btn = pc.querySelector('button');
                        const parent = btn.parentNode;
                        btn.addEventListener('mousedown', (e) => {
                            const inputs = pc.querySelectorAll('input');
                            let row = inputs[0].value | 0;
                            let col = inputs[1].value | 0;
                            if (row > 100 || col > 50) {
                                // 超出限制
                                parent.removeChild(btn);
                                setTimeout(() => {
                                    parent.appendChild(btn);
                                });
                            }
                        });
                    }, 500);
                });
            } catch (e) {}
        }
    }
};
</script>
