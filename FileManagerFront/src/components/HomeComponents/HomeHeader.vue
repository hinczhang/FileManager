<template>
    <div>
        <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">主页</el-menu-item>
        <el-submenu index="2">
            <template slot="title">用户选项</template>
            <el-menu-item index="2-1">信息</el-menu-item>
            <el-menu-item @click="dialogFormVisible=true" index="2-2">修改密码</el-menu-item>
            <el-menu-item @click="logout" index="2-3">登出</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" v-if="isAdmin"><router-link to="/admin">管理控制台</router-link></el-menu-item>
        <el-menu-item index="4"><a href="https://cv.standardserve.org/" target="_blank">作者主页</a></el-menu-item>
        </el-menu>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :fullscreen="true">
            <change-password :dialogFormVisible="dialogFormVisible" :token="vice_token" :username="username"></change-password>
        </el-dialog>
    </div>

</template>

<script>
import ChangePassword from './ChangePassword.vue';

export default {
    name: 'HomeHeader',
    props: ["admin", "token"],
    components: {ChangePassword},
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            dialogFormVisible: false,
            username: '',
            vice_token: '',
            isAdmin: false
        }
    },
    created() {
        this.vice_token = localStorage.getItem('Authorization');
        this.username = localStorage.getItem('username');
        this.isAdmin = localStorage.getItem('isAdmin') === '1'?true:false;
    },
    methods: {
        handleSelect(){},
        logout() {
            localStorage.removeItem("Authorization");
            localStorage.removeItem("username");
            localStorage.removeItem("isAdmin");
            this.$router.push('/login');
        }
    }
}
</script>

<style>
a {
  text-decoration: none;
}
 
.router-link-active {
  text-decoration: none;
}
</style>