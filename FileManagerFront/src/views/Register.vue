<template>
    <div class="login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="form">
            <div class="form-title">文件管理系统注册界面</div>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="text"><router-link to="/login">去登录</router-link></el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Register',
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
                }else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            }
        };

        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            msg: 'Welcome to Your Vue.js App',
            ruleForm: {
                username: '',
                password: '',
                checkPass: ''
            },
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                username: [
                    { validator: checkUsername, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios({
                        method: 'post',
                        url: '/login',
                        data: {
                            mode: 'register',
                            username: _this.ruleForm.username,
                            password: _this.ruleForm.password
                        }
                    })
                    .then((res) => {
                        if(res.data.status === 0){
                            _this.$message({
                                showClose: true,
                                message: '注册成功！请等待管理员审核。正在跳转到登录页...',
                                type: 'success'
                            });
                            //_this.$store.commit('store/changeLogin', res.data.token);
                            //_this.changeLogin({ Authorization: res.data.token });
                            //_this.changeUsername({ User: _this.ruleForm.username});
                            _this.$router.push('/login');
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '注册失败！用户名已存在',
                                type: 'error'
                            });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                } else {
                    _this.$message({
                        showClose: true,
                        message: '请重新输入信息',
                        type: 'error'
                    });
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        toRegister() {

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