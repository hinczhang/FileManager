#!/bin/bash
npm run build
docker rm -f filemanager
docker run -it -d --rm -p 8083:80 --name filemanager -v $PWD/dist:/usr/share/nginx/html -v $PWD/default.conf:/etc/nginx/conf.d/default.conf --privileged=true nginx
