<template>
    <div>
        <el-container>
            <el-header>
                <admin-header></admin-header>
            </el-header>
            <el-main>
                <admin-users></admin-users>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script>
import AdminHeader from '../components/AdminComponents/AdminHeader.vue';
import AdminUsers from '../components/AdminComponents/AdminUsers.vue';

export default {
    name: 'Admin',
    components: {AdminHeader, AdminUsers},
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            username: '',
            token: ''
        }
    },
    created() {
        this.username = localStorage.getItem("username");
        this.token = localStorage.getItem("Authorization");
    }
}
</script>