<template>
    <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="80px" :rules="rules" status-icon>
            <el-form-item label="初始密码" prop="inital">
                <el-input v-model="ruleForm.inital" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" :show-password="true"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangePassword',
    data () {
        var checkinital = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入密码'));
            }
            if (value.length > 20 || value.length <6) {
                callback(new Error('密码长度应在6~20个字符之间'));
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
                inital: '',
                password: '',
                checkPass: ''
            },
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                inital: [
                    { validator: checkinital, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    created () {
        this.token = localStorage.getItem('Authorization');
        this.username = localStorage.getItem('username');
    },
    methods: {
        submitForm(formName) {
            var _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios({
                        method: 'post',
                        url: '/files',
                        data: {
                            mode: 'update_password',
                            username: _this.username,
                            c_pass: _this.ruleForm.inital,
                            n_pass: _this.ruleForm.password,
                            token: _this.token
                        }
                    })
                    .then((res) => {
                        console.log(res.data)
                        if(res.data.status === 0){
                            _this.$message({
                                showClose: true,
                                message: '修改成功！正在跳转到登录页...',
                                type: 'success'
                            });
                            localStorage.removeItem("Authorization");
                            localStorage.removeItem("username");
                            _this.$router.push('/login');
                        } else {
                            _this.$message({
                                showClose: true,
                                message: '修改失败！请检查密码',
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
    }
}
</script>