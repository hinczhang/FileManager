# filemanagerfront

> File manager system with user control functions

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).  

### hostory mode
In `router/index.js`, add `mode: 'hostory'`.  
In the nginx confinguration file, add:  
'''
server {
    listen 80;
    server_name xx;

     location / {
        root xx;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
   
}
'''
