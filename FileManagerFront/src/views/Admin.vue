<template>
    <div>
        <admin-header style="margin-bottom: 10px"></admin-header>

        <admin-users></admin-users>

        <el-footer>Footer</el-footer>

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

<style scoped>

</style>