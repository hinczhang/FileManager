<template>
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>Admin</span>
        <el-button style="float: right; padding: 3px 0" type="text"><router-link to="/">返回文件管理系统</router-link></el-button>
    </div>
</el-card>

</template>

<script>
export default {
    name: 'AdminHeader',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',

        }
    },
    
}
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 80%;
    margin: 0 auto;
  }
</style>