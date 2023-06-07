# filemanagerfront

> File manager system with user control functions

## Build Setup

``` bash
sh ./run_docker.sh
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).  

### hostory mode
In `router/index.js`, add `mode: 'hostory'`.  
In the nginx confinguration file, add:  
```
server {
    listen 80;
    server_name xx;

     location / {
        root xx;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
   
}
```

### nginx configuration
```
server {
    listen 80;
    server_name xx;
    client_max_body_size 100M; # please keep this value!!! as the backend server will use this value to limit the upload file size; meanwhile the frontend, 
    # HomeFiles.vue also use this value to limit the file size (in an if-else sentence).
    location / {
        root xx;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
   
}
```
