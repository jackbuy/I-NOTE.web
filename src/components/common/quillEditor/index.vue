<template>
    <div>
        <quill-editor
            ref="quillEditor"
            :content="getProps"
            :options="editorOption"
            @change="onEditorChange($event)">
        </quill-editor>
        <!-- 文件上传input 将它隐藏-->
        <el-upload
            :action="uploadUrl"
            :headers="headers"
            :data="dataOptions"
            :show-file-list="false"
            :before-upload='editorbeforeupload'
            :on-success='editorSuccess'
            style="display:none"
            ref="uniqueId"
            id="uniqueId">
        </el-upload >
    </div>
</template>

<script>
import { apiBaseUrl, imgBaseUrl } from '@/constants/url-config';
import hljs from 'highlight.js';
export default {
    name: 'Editor',
    model: {
        prop: 'getProps',
        event: 'callback'
    },
    props: {
        getProps: {
            type: String,
            default: ''
        },
        toolbar: {
            type: Array,
            default: () => [
                [
                    {'header': 1}
                    // {'header': 2}
                ],
                [
                    'bold',
                    'italic',
                    'underline',
                    'strike'
                ],
                // [{'script': 'sub'}, {'script': 'super'}],
                ['blockquote', 'code-block'],
                [
                    {'color': []},
                    {'background': []}
                ],
                [{'indent': '-1'}, {'indent': '+1'}],
                // [{'direction': 'rtl'}],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                // [{'header': [1, 2, 3, 4, 5, 6, false]}],
                // [{'font': []}],
                [{'align': []}],
                [
                    'link',
                    'image',
                    'video'
                    // 'formula'
                ],
                ['clean']
                // [{'size': ['small', false, 'large', 'huge']}]
            ]
        },
        placeholder: {
            type: String,
            default: '请输入内容...'
        },
        articleId: String,
        token: String
    },
    data() {
        return {
            editorOption: {
                // some quill options 一些参数，为空时，加载全部参数
                // theme: 'bubble', // 气泡模式
                placeholder: this.placeholder,
                modules: {
                    toolbar: this.toolbar
                }
            }
        };
    },
    computed: {
        dataOptions() {
            return {
                type: 0,
                targetId: this.articleId
            };
        },
        uploadUrl() {
            return `${apiBaseUrl}/file/single/upload`;
        },
        headers() {
            return {
                token: this.token
            };
        }
    },
    created() {
        // 配置代码高亮
        this.editorOption.modules.syntax = {
            highlight: text => hljs.highlightAuto(text).value
        };
    },
    mounted() {
        // 重新绑定image事件
        this.$refs.quillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
    },
    methods: {
        onEditorChange({ quill, html, text }) {
            this.$emit('callback', html);
            this.$emit('get-text', text);
        },
        imgHandler(state) {
            if (state) {
                let fileInput = document.querySelector('#uniqueId input'); // 隐藏的file元素
                fileInput.click(); // 触发事件
            }
        },
        editorbeforeupload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG或PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        editorSuccess(response, file, fileList) {
            const { code, data } = response;
            if (code === 200) {
                let value = `${imgBaseUrl}/${data}`;
                this.addImgRange = this.$refs.quillEditor.quill.getSelection();
                let index = this.addImgRange != null ? this.addImgRange.index : 0;
                this.$refs.quillEditor.quill.insertEmbed(index, 'image', value);
                this.$refs.quillEditor.quill.setSelection(index + 1); // 光标位置加1
            }
        }
    }
};
</script>
