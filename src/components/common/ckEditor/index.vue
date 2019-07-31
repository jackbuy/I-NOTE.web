<template>
    <ckeditor :editor="editor" v-model="value" :config="editorConfig"></ckeditor>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
export default {
    name: 'CkEditor',
    data() {
        return {
            editor: ClassicEditor,
            value: '<p>ttttttttttttttttt</p>',
            editorConfig: {
                // The configuration of the editor.
                plugins: [
                    CKFinder
                ]
            }
        };
    },
    watch: {
        value(n, o) {
            console.log(n);
        }
    }
};
</script>
