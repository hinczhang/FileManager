import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Admin from '@/views/Admin'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login'|| to.path === '/register') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    let admin = localStorage.getItem('isAdmin');
    
    if (token === null || token === '') {
      next('/login');
    } else {
      if(to.path === '/admin'){
        if(admin==='1'){
          next()
        } else{
          next('/');
        }
      }else{
        next();
      }
      
    }
  }
});

export default router;
