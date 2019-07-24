/*
 @desc 消息提醒
*/
export default {
    methods: {
        /* 所有确认弹窗都能调用该方法，通过传入title和content的值来改变内容
         增加可以设置customClass（自定义类名）；
         */
        confirmWarning({
            title = '删除提示',
            content = '',
            confirmButtonText = '确定',
            cancelButtonText = '取消',
            showConfirmButton = true,
            showCancelButton = true,
            customClass,
            type = 'warning',
            confirmButtonClass = 'el-button--danger confirm'
        }) {
            return this.$confirm(content, title, {
                showConfirmButton,
                showCancelButton,
                confirmButtonText,
                cancelButtonText,
                customClass,
                type,
                confirmButtonClass
            });
        },

        showErrorMsg(message) {
            this.$message({
                message: message,
                type: 'error'
            });
        },

        showWarningMsg(message) {
            this.$message({
                message: message,
                onClose: function() {
                    // 关闭事件的回调
                },
                type: 'warning'
            });
        },

        showWarningBox(message) {
            this.$alert(message, {
                confirmButtonText: '确定',
                title: '警告',
                closeOnClickModal: true,
                type: 'warning'
            });
        },

        showSuccessMsg(msg) {
            this.$message({
                message: msg,
                type: 'success'
            });
        },
        showInfoMsg(msg) {
            this.$message({
                message: msg,
                type: 'info'
            });
        }
    }
};
