<template>
    <div class="login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="form">
            <div class="form-title">文件管理系统登陆界面</div>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="保持登录">
                <el-switch v-model="ruleForm.keep"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="text"><router-link to="/register">去注册</router-link></el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {mapMutations} from 'vuex';
import router from '../router';

export default {
    name: 'Login',
    data () {
        var checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名不能为空'));
            }
            if(value.length > 20){
                return callback(new Error('用户名过长'));
            }
            return callback();
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (value.length > 20 || value.length <6) {
                    callback(new Error('密码长度应在6~20个字符之间'));
                }
                return callback();
            }
        };

        return {
            msg: 'Welcome to Your Vue.js App',
            dialogVisible: false,
            ruleForm: {
                username: '',
                password: '',
                keep: false
            },
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                username: [
                    { validator: checkUsername, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        ...mapMutations(['changeLogin', 'changeUsername']),
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios({
                        method: 'post',
                        url: '/login',
                        data: {
                            mode: 'login',
                            username: _this.ruleForm.username,
                            password: _this.ruleForm.password,
                            keep: _this.ruleForm.keep?1:0
                        }
                    })
                    .then((res) => {
                        if(res.data.status === 0){
                            _this.$message({
                                showClose: true,
                                message: '登录成功！',
                                type: 'success'
                            });
                            localStorage.setItem("Authorization", res.data.token);
                            localStorage.setItem("isAdmin", res.data.admin);
                            localStorage.setItem("username", _this.ruleForm.username);
                            _this.$router.push('/');
                        } else if(res.data.status === 1) {
                            _this.$message({
                                showClose: true,
                                message: '用户不存在！',
                                type: 'error'
                            });
                        } else if(res.data.status === 2) {
                            _this.$message({
                                showClose: true,
                                message: '密码错误！',
                                type: 'error'
                            });
                        } else if(res.data.status === 3) {
                            _this.$message({
                                showClose: true,
                                message: '用户未生效，请联系管理员！',
                                type: 'error'
                            });
                        } else{
                            _this.$message({
                                showClose: true,
                                message: '登陆失败！',
                                type: 'error'
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        localStorage.removeItem('Authorization');
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }

    }
}
</script>

<style scoped>
.login{
    background-image: url(../assets/bg/login.jpeg);
    background-repeat: no-repeat, no-repeat;
    background-size:cover;
    width: 100vw;
    height: 100vh;
    display:flex;
    justify-content:center;  
    align-items:center;
}

.form{
    width: 50%;
    background-color: rgba(255, 255, 255, 0.345);
    padding: 50px;
    border-radius: 10px 10px 10px 10px;
    -moz-border-radius: 10px 10px 10px 10px;
    -webkit-border-radius: 10px 10px 10px 10px;
    border: 0px solid #000000;
}

.form-title{
    font-family: "trebuchet MS", sans-serif;
    font-size: 26px;
    line-height: 2.5;
    margin-bottom: 10%;
}


</style>