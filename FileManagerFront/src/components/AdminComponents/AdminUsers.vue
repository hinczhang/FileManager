<template>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>用户管理</span>
    </div>
    <div>
        <el-table
            :data="users"
            style="width: 80%; margin: 0 auto">
            <el-table-column
                prop="username"
                label="用户名"
                sortable>
            </el-table-column>
            <el-table-column
                label="管理员权限"
                sortable>
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.isAdmin"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="changeAdmin(scope.row)"
                        :disabled="scope.row.username==='hinczhang'">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="是否激活"
                sortable>
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.isValid"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="changeValid(scope.row)"
                        :disabled="scope.row.username==='hinczhang'">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                prop="current"
                label="占用存储"
                sortable>
            </el-table-column>
            <el-table-column
                label="总存储 (GB)"
                sortable>
                <template slot-scope="scope">
                    <el-input-number v-model="scope.row.limit" size="mini" @change="limitChange(scope.row)" :min="0.5" :max="60" label="存储分配"></el-input-number>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleDelete(scope.row)" type="text" size="small" :disabled="scope.row.username==='hinczhang'">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</el-card>

</template>

<script>
export default {
    name: 'AdminUser',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            users: [],
            token: '',
            username: ''
        }
    },
    created() {
        this.token = localStorage.getItem("Authorization");
        this.username = localStorage.getItem("username");
        this.loadingUsers();
    },
    methods: {
        loadingUsers() {
            this.$axios({
                method: 'post',
                url: '/files',
                data: {
                    mode: 'get_user',
                    username: this.username,
                    token: this.token,
                }
            })
            .then((res) => {
                if(res.data.status === 2){
                    this.$message({
                        showClose: true,
                        message: '登录失效，请重新登录！',
                        type: 'warning'
                    });
                    localStorage.removeItem("Authorization");
                    localStorage.removeItem("username");
                    localStorage.removeItem("isAdmin");
                    this.$router.push('/login');
                }
                this.users = res.data.users;
                this.users.forEach((ele) => {
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
                    
                });
                
            })
            .catch((err) => {
                console.log(err);
            })
        },
        changeAdmin(row){
            this.$axios({
                method: 'post',
                url: '/files',
                data: {
                    mode: 'update_admin',
                    username: this.username,
                    token: this.token,
                    target_username: row.username,
                    isAdmin: row.isAdmin?1:0
                }
            })
            .then((res) => {
                if(res.data.status === 0){
                    this.$message({
                        showClose: true,
                        message: '更新成功！',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: '更新失败！',
                        type: 'error'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.$message({
                    showClose: true,
                    message: '更新失败！',
                    type: 'error'
                });
            })
        },
        changeValid(row){
            this.$axios({
                method: 'post',
                url: '/files',
                data: {
                    mode: 'confirm_user',
                    username: this.username,
                    token: this.token,
                    target_username: row.username,
                    isValid: row.isValid?1:0
                }
            })
            .then((res) => {
                if(res.data.status === 0){
                    this.$message({
                        showClose: true,
                        message: '更新成功！',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: '更新失败！',
                        type: 'error'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.$message({
                    showClose: true,
                    message: '更新失败！',
                    type: 'error'
                });
            })
        },
        handleDelete(row){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios({
                method: 'post',
                url: '/files',
                data: {
                    mode: 'delete_user',
                    username: this.username,
                    token: this.token,
                    target_username: row.username,
                }
            })
            .then((res) => {
                if(res.data.status === 0){
                    this.$message({
                        showClose: true,
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.users = this.users.filter((value, index, arr) => {
                        return value.username != row.username;
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: '删除失败！',
                        type: 'error'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.$message({
                    showClose: true,
                    message: '删除失败！',
                    type: 'error'
                });
            })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        limitChange(row){
            this.$axios({
                method: 'post',
                url: '/files',
                data: {
                    mode: 'update_limit',
                    username: this.username,
                    token: this.token,
                    target_username: row.username,
                    limit: row.limit
                }
            })
            .then((res) => {
                if(res.data.status === 0){
                    this.$message({
                        showClose: true,
                        message: '更新成功！',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: '更新失败！',
                        type: 'error'
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.$message({
                    showClose: true,
                    message: '更新失败！',
                    type: 'error'
                });
            })
        }
    }
    
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>