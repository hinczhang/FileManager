<template>
    <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名">{{ data.username }}</el-descriptions-item>
        <el-descriptions-item label="分配内存">{{ data.limit }} GB</el-descriptions-item>
        <el-descriptions-item label="现用内存">{{ data.current }}</el-descriptions-item>
        <el-descriptions-item label="备注">
            <el-tag size="small" v-if="data.isAdmin">管理员用户</el-tag>
            <el-tag size="small" v-if="!data.isAdmin">普通用户</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="是否激活"><el-tag size="small">是</el-tag></el-descriptions-item>
    </el-descriptions>
</template>

<script>
export default {
    name: 'UserInfo',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            username: '',
            token: '',
            data: {}
        }
    },
    created() {
        this.username = localStorage.getItem("username");
        this.token = localStorage.getItem("Authorization");
        this.getUserInfo();
    },
    methods: {
        getUserInfo(){
            let _this = this;
            this.$axios({
                method: 'post',
                url: '/files',
                data: {
                    mode: 'get_info',
                    username: _this.username,
                    token: _this.token
                }
            })
            .then((res) => {
                if(res.data.status === 0){
                    this.data = this.dataProccessing(res.data.info);
                } else {
                    _this.$message({
                        showClose: true,
                        message: '获取信息失败，数据库错误！',
                        type: 'error'
                    });
                }
            })
            .catch((err) => {
                _this.$message({
                    showClose: true,
                    message: '获取信息失败，网络错误！',
                    type: 'error'
                });
                console.log(err);
            })
        },
        dataProccessing(ele){
            if("limit" in ele){
                ele.limit = ele.limit/1024/1024/1024;
            }else{
                ele.limit = 0;
            }

            ele.isAdmin = ele.isAdmin===1?true:false;
            ele.isValid = ele.isValid===1?true:false;
            if(ele.current < 500){
                ele.current = String(ele.current) + ' B'
            }else if(ele.current >= 500 && ele.current <500*1024){
                ele.current = (ele.current/1024).toFixed(2) + ' KB';
            }else if(ele.current > 500*1024 && ele.current < 500*1024*1024){
                ele.current = (ele.current/1024/1024).toFixed(2) + ' MB';
            }else{
                ele.current = (ele.current/1024/1024/1024).toFixed(2) + ' GB';
            }
            return ele;
        }
    }
    
}
</script>