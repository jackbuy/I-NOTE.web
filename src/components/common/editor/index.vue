<template>
    <div>
        <quill-editor
            :content="getProps"
            :options="editorOption"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>

<script>
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
        }
    },
    data() {
        return {
            editorOption: {
                // some quill options 一些参数，为空时，加载全部参数
                // theme: 'bubble',
                placeholder: '请输入内容...',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        // [{'header': [1, 2, 3, 4, 5, 6, false]}],
                        [{'color': []}, {'background': []}],
                        // [{'font': []}],
                        [{'align': []}],
                        ['link', 'image'],
                        ['clean']
                    ]
                }
            }
        };
    },
    mounted() {
        // this.editor.container.style.height = `${500}px`;
    },
    methods: {
        onEditorChange({ quill, html, text }) {
            this.$emit('callback', html);
            this.$emit('get-text', text);
        }
    }
};
</script>
<!-- https://blog.csdn.net/qq_39865491/article/details/88050596 -->
<style>
    .quill-editor{
        background: #fff;
    }
    .ql-snow .ql-picker{
        line-height: 24px;
    }
    .ql-toolbar.ql-snow{
        padding: 0;
    }
    .ql-container.ql-snow{
        /* height: calc(100% - 185px); */
        height: 400px;
    }
    .ql-toolbar.ql-snow .ql-formats{
        margin-right: 0;
    }
</style>
