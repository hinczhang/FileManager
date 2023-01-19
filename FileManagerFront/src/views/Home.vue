<template>
    <div class="home">
        <el-container>
            <el-header style="padding: 0;">
                <home-header></home-header>
            </el-header>
            <el-main>
                <home-files :username="username" :token="token"></home-files>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import HomeHeader from '@/components/HomeComponents/HomeHeader.vue'
import HomeFiles from '../components/HomeComponents/HomeFiles.vue';

export default {
    name: 'Home',
    components: {HomeHeader, HomeFiles},
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
.home{
    background-image: url(../assets/bg/home.jpg);
    background-repeat: no-repeat, no-repeat;
    background-size:cover;
    justify-content:center;  
    align-items:center;
    height: 100vh;
}

</style>