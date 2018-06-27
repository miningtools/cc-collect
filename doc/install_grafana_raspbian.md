# Install Grafana server on Raspbian


### Install

> collector@yourhost:~$  curl https://bintray.com/user/downloadSubjectPublicKey?username=bintray | sudo apt-key add -
>
>echo "deb https://dl.bintray.com/fg2it/deb stretch main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
> 
> collector@yourhost:~$  sudo apt-get update && sudo apt-get install -y  grafana

### Start

> user@host:~$ sudo service grafana-server start 

### Check Grafana service 

> user@host:~$ sudo service grafana-server status

### Check Grafana web client

Open web browser and go to http://localhost:3000 

![alt text](https://drive.google.com/uc?id=1ajajwCI7s-Aez7DuXTD2kQtxYUykprDD "Grafana in browser")

Default user/password is **admin/admin**