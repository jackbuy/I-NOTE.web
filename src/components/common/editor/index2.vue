<template>
    <div>
        <quill-editor
            ref="quillEditor"
            :content="getProps"
            :options="editorOption"
            @change="onEditorChange($event)">
        </quill-editor>
        <!-- 文件上传input 将它隐藏-->
        <!-- <el-upload
            :action="uploadUrl"
            :headers="headers"
            :data="dataOptions"
            :show-file-list="false"
            :before-upload='editorbeforeupload'
            :on-success='editorSuccess'
            style="display:none"
            ref="uniqueId"
            id="uniqueId">
        </el-upload > -->
    </div>
</template>

<script>
import { imgBaseUrl } from '@/constants/url-config';
import { quillEditor, Quill } from 'vue-quill-editor';
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module';

Quill.register('modules/ImageExtend', ImageExtend);
// import hljs from 'highlight.js';
// import 'quill/dist/quill.snow.css';
// import 'highlight.js/styles/monokai-sublime.css';
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
    components: {
        quillEditor
    },
    data() {
        return {
            headers: {
                token: localStorage.getItem('token')
            },
            dataOptions: {
                type: 0
            },
            editorOption: {
                // some quill options 一些参数，为空时，加载全部参数
                // theme: 'bubble', // 气泡模式
                placeholder: this.placeholder,
                modules: {
                    ImageExtend: {
                        loading: true,
                        name: 'img',
                        action: this.uploadUrl,
                        response: (res) => {
                            console.log(this.uploadUrl);
                            console.log(res);
                            return res.info;
                        }
                    },
                    toolbar: {
                        container: container,
                        handlers: {
                            'image': function() {
                                QuillWatch.emit(this.quill.id);
                            }
                        }
                    }
                    // toolbar: [
                    //     ['bold', 'italic', 'underline', 'strike'],
                    //     ['blockquote', 'code-block'],
                    //     [{'list': 'ordered'}, {'list': 'bullet'}],
                    //     [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    //     [{'color': []}, {'background': []}],
                    //     // [{'font': []}],
                    //     [{'align': []}],
                    //     ['link', 'image', 'video'],
                    //     ['clean']
                    // ]
                }
                // syntax: {
                //     highlight: text => hljs.highlightAuto(text).value
                // }
            }
        };
    },
    computed: {
        uploadUrl() {
            return `${imgBaseUrl}/single/uploadfile`;
        }
    },
    mounted() {
        // 重新绑定image事件
        // this.$refs.quillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
        // 配置高亮
        // this.editorOption.modules.syntax = {
        //     highlight: text => hljs.highlightAuto(text).value
        // };
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
                let value = `${imgBaseUrl}/${response.data}`;
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
