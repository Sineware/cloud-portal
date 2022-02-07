#!/bin/bash
echo "Deploying for web"
expo build:web
ssh ubuntu@192.168.11.86 "sudo rm -rf /var/www/cloud-portal/*; rm -rf /home/ubuntu/web-build"
scp -r web-build ubuntu@192.168.11.86:~
ssh ubuntu@192.168.11.86 "sudo cp -r /home/ubuntu/web-build/* /var/www/cloud-portal/"
