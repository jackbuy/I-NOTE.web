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
import { imgBaseUrl } from '@/constants/url-config';
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
        placeholder: {
            type: String,
            default: '请输入内容...'
        }
    },
    data() {
        return {
            editorOption: {
                // some quill options 一些参数，为空时，加载全部参数
                // theme: 'bubble', // 气泡模式
                placeholder: this.placeholder,
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        [{'header': [1, 2, 3, 4, 5, 6, false]}],
                        [{'color': []}, {'background': []}],
                        // [{'font': []}],
                        [{'align': []}],
                        ['link', 'image', 'video'],
                        ['clean']
                    ]
                }
            }
        };
    },
    computed: {
        uploadUrl() {
            return `${imgBaseUrl}/uploadfile`;
        }
    },
    mounted() {
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
            if (response.code === 200) {
                let value = `${imgBaseUrl}/${response.data[0].filename}`;
                this.addImgRange = this.$refs.quillEditor.quill.getSelection();
                let index = this.addImgRange != null ? this.addImgRange.index : 0;
                this.$refs.quillEditor.quill.insertEmbed(index, 'image', value);
                this.$refs.quillEditor.quill.setSelection(length + 1); // 光标位置加1
            }
        }
    }
};
</script>
<!-- https://blog.csdn.net/qq_39865491/article/details/88050596 -->
<style lang="less">
    @import './index.less';
</style>
