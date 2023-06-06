<template>
    <div>
        <el-container>
            <el-main>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <div style="float:left">
                                <el-breadcrumb separator-class="el-icon-arrow-right">
                                    <el-breadcrumb-item div v-for="(item, index) in paths" :key="index">
                                        <el-button type="text" @click="menuHandle(index, item)" class="page-header">{{ item }}</el-button>
                                    </el-breadcrumb-item>
                                </el-breadcrumb>
                           </div>
                    </div>
                    <el-table
                        :data="files"
                        style="width: 95%; margin: 0 auto">
                        <el-table-column
                            width = "50">
                            <template slot-scope="scope">
                                <el-tag size="small" v-if="scope.row.type === 'file'">
                                    <i class="el-icon-tickets"></i>
                                </el-tag>
                                <el-tag type="success" size="small" v-if="scope.row.type === 'dir'">
                                    <i class="el-icon-folder"></i>
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="文件名"
                            sortable>
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="light" :content="scope.row.name" placement="bottom">
                                    <el-button type="text" size="medium" @click="fileHandle(scope.row)" :disabled="scope.row.name === 'tmp' && paths.length === 1">{{ scope.row.name }}</el-button>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="创建日期"
                            sortable>
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="创建时间"
                            sortable>
                        </el-table-column>
                        <el-table-column
                            label="大小"
                            sortable>
                            <template slot-scope="scope">
                                <div v-if="scope.row.type === 'file'">{{scope.row.size}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.type === 'file'" @click="handleDownload(scope.row)" type="text" size="small">下载</el-button>
                                <el-button @click="handleDelete(scope.row)" type="text" size="small" :disabled="scope.row.name === 'tmp' && paths.length === 1">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-divider></el-divider>
                    <el-row>
                        <el-col :span="12">
                            <input v-show="false" ref="fileRef" type="file" @change="fileChange">
                            <el-button @click="handleUpload" round>上传文件 <i class="el-icon-upload el-icon--right"></i></el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button @click="createDir" round>新建文件夹 <i class="el-icon-circle-plus el-icon--right"></i></el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-main>
            <el-footer>
                
            </el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'HomeFiles',
    props: ["admin", "token", "username"],
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            paths: [],
            fileList: [],
            files: []
        }
    },
    mounted () {
        this.paths.push(this.username);
        var currentPath = this.getCurrentPath();
        this.loadingFiles(currentPath);
    },
    methods: {
        loadingFiles(path){
            this.$axios({
                method: 'post',
                url: '/files',
                data: {
                    mode: 'search',
                    username: this.username,
                    token: this.token,
                    path: path
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
                this.files = res.data.data;
                this.files.forEach((ele) => {
                    if(ele.size < 500){
                        ele.size = String(ele.size) + ' B'
                    }else if(ele.size >= 500 && ele.size <500*1024){
                        ele.size = (ele.size/1024).toFixed(2) + ' KB';
                    }else if(ele.size > 500*1024 && ele.size < 500*1024*1024){
                        ele.size = (ele.size/1024/1024).toFixed(2) + ' MB';
                    }else{
                        ele.size = (ele.size/1024/1024/1024).toFixed(2) + ' GB';
                    }
                    
                });
                
            })
            .catch((err) => {
                console.log(err);
            })
        },
        handleDownload(row){
            var path = this.getCurrentPath();
            this.$axios({
                method: 'post',
                responseType: 'blob',
                url: '/files',
                data: {
                    mode: 'download',
                    username: this.username,
                    token: this.token,
                    path: path,
                    name: row.name
                }
            })
            .then((res) => {
                const blobUrl = window.URL.createObjectURL(res.data);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.download = row.name;
                a.href = blobUrl;
                const blob = new Blob([res.data], { type: 'application/zip' });
                let link = window.URL.createObjectURL(blob);
                console.log(link);
                a.click();
            })
            .catch((err) => {
                console.log(err);
            })
        },
        handleDelete(row){
            var path = this.getCurrentPath();
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios({
                    method: 'post',
                    url: '/files',
                    data: {
                        mode: 'delete',
                        username: this.username,
                        token: this.token,
                        path: path,
                        file: row.name,
                        type: row.type
                    }
                })
                .then((res) => {
                    if(res.data.status === 0){
                        this.$message({
                            showClose: true,
                            message: '删除成功！',
                            type: 'success'
                        });
                        this.loadingFiles(path);
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
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        fileHandle(row){
            if(row.type === 'dir'){
                this.paths.push(row.name);
                var path = this.getCurrentPath();
                this.loadingFiles(path);
            }
        },
        menuHandle(index, item){
            this.paths = this.paths.slice(0, index + 1);
            var path = this.getCurrentPath();
            this.loadingFiles(path);
        },
        createDir(){
            var path = this.getCurrentPath();
            this.$prompt('请输入新建文件夹名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[A-Za-z0-9]+$/,
                inputErrorMessage: '请勿输入特殊符号和空格 (建议只用英文大小字符)'
            }).then(({ value }) => {
                this.$axios({
                    method: 'post',
                    url: '/files',
                    data: {
                        mode: 'create',
                        username: this.username,
                        token: this.token,
                        path: path,
                        new_path: value
                    }
                })
                .then((res) => {
                    if(res.data.status === 0){
                        this.$message({
                            type: 'success',
                            message: '创建文件夹: ' + value + ' 成功!'
                        });
                        this.loadingFiles(path);
                    } else {
                        this.$message({
                            showClose: true,
                            message: '创建失败！文件夹已存在',
                            type: 'error'
                        });
                    }
                })
                .catch((err) => {
                    this.$message({
                        showClose: true,
                        message: '创建失败！请联系管理员',
                        type: 'error'
                    });
                    console.log(err);
                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });

        },
        getCurrentPath(){
            return this.paths.join("/");
        },
        fileChange(e) {
            const files = e.target.files
            if(files.length!=1){
                if(files.length > 1){
                    this.$message({
                        showClose: true,
                        message: '上传文件数量过多，请只选择一个文件',
                        type: 'warning'
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: '请选择文件',
                        type: 'warning'
                    });
                }
                return;
            }
            const rawFile = files[0];
            if(rawFile.size > 1024*1024*100) {
                this.$message({
                    showClose: true,
                    message: '文件大小不能超过100MB',
                    type: 'warning'
                });
                return;
            }
            var path = this.getCurrentPath();
            let formData = new FormData();
            formData.append("files", rawFile);
            formData.append("mode", "add");
            formData.append("username", this.username);
            formData.append("token", this.token);
            formData.append("path", path);
            var path = this.getCurrentPath();
            this.$axios({
                method: 'post',
                url: '/files',
                data: formData,
                headers:{'Content-Type':'multipart/form-data'}
            })
            .then((res) => {
                if(res.data.status === 0){
                    this.loadingFiles(path);
                    this.$message({
                        showClose: true,
                        message: '上传成功!',
                        type: 'success'
                    });
                }
                else if(res.data.status === 2){
                    this.$message({
                        showClose: true,
                        message: '文件已存在！',
                        type: 'error'
                    });
                } else if(res.data.status === 4){
                    this.$message({
                        showClose: true,
                        message: '空间不足，请删除一部分文件！',
                        type: 'error'
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: '数据库错误！请咨询管理员。',
                        type: 'error'
                    });
                }
                
            })
            .catch((err) => {
                console.log(err);
            })

        },
        handleUpload(){
            this.$refs.fileRef.dispatchEvent(new MouseEvent('click'))
        }
    }
}
</script>

<style>

</style>

<style scoped>
.page-header{
    font-family: arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    line-height: 40px;
}
.box-card{
    width: 90%;
    margin: 0 auto;
}
.clearfix:before,

.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
</style>