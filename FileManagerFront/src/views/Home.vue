<template>
    <div>
        <el-container>
            <el-header>
                <home-header></home-header>
            </el-header>
            <el-main>
                <home-files :username="username" :token="token"></home-files>
            </el-main>
            <el-footer>Footer</el-footer>
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