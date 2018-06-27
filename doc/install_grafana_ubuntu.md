# Install Grafana server on Ubuntu

### Install

> user@host:~$ echo "deb https://packagecloud.io/grafana/stable/debian/ stretch main" | sudo tee /etc/apt/sources.list.d/grafana.list
> 
> user@host:~$  curl https://packagecloud.io/gpg.key | sudo apt-key add -
> 
> user@host:~$  sudo apt-get update && sudo apt-get install -y grafana     


### Enable auto-start 


> user@host:~$ sudo systemctl enable grafana-server


### Start

> user@host:~$ sudo systemctl start grafana-server

### Check Grafana service 

> user@host:~$ sudo systemctl status grafana-server 


### Check Grafana web client

Open web browser and go to http://localhost:3000 

![alt text](https://drive.google.com/uc?id=1ajajwCI7s-Aez7DuXTD2kQtxYUykprDD "Grafana in browser")

Default user/password is **admin/admin**

