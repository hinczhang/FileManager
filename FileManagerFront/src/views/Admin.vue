<template>
    <div class="admin">
        <admin-header style="margin-bottom: 10px"></admin-header>
        <admin-users></admin-users>
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
.admin{
    background-image: url(../assets/bg/home.jpg);
    background-repeat: no-repeat, no-repeat;
    background-size:cover;
    justify-content:center;  
    align-items:center;
    height: 100vh;
}
</style>