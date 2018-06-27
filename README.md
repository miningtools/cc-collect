# cc-collect
ccminer collector for InfluxDB & Grafana

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development, testing  and purposes. 

### Prerequisites

These things do you need to install the software:

```
Desktop computer with Ubuntu / Debian OS, or RASPBERRY PI 3 with Raspbian OS

Node.js® 8.11.3 - is a JavaScript runtime built on Chrome's V8 JavaScript engine.
InfluxDB 1.5.2 - the Time Series Database in the TICK Stack
Grafana 5.1.3 - the leading open source software for time series analytics
```

[Install Ubuntu desktop](https://tutorials.ubuntu.com/tutorial/tutorial-install-ubuntu-desktop)

[What is a Raspberry Pi?](https://www.youtube.com/watch?v=gbJB3387xUw)

[Install Raspbian](https://www.raspberrypi.org/documentation/installation/noobs.md)

----

## 1. Installing prerequisites


### 1.1. Open terminal window and update your Operating System and install requirement packages

> youruser@yourhost:~$ sudo apt-get update && sudo apt-get upgrade -y 
> 
> youruser@yourhost:~$ sudo apt-get install -y curl git apt-transport-https

### 1.2. Create user for cc-collect service 

> youruser@yourhost:~$ sudo useradd --home-dir /home/collector --create-home --shell /bin/bash --system --user-group --groups sudo collector
>
> youruser@yourhost:~$ sudo passwd collector 
>
> youruser@yourhost:~$ sudo su - collector

```
Enter new UNIX password:
Retype new UNIX password:
```

### 1.3. Install InfluxDB

### 1.3.1. Make the InfluxDB data directory to your home directory

> collector@yourhost:~$ mkdir influxdb 
> 
> collector@yourhost:~$ sudo ln -sf /home/collector/influxdb/ /var/lib/influxdb
> 

### 1.3.2. Install 

#### 1.3.2.1. Install on Ubuntu

> collector@yourhost:~$ curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
> 
> collector@yourhost:~$ source /etc/lsb-release
> 
> collector@yourhost:~$ echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list 
> 
> collector@yourhost:~$ sudo apt-get update && sudo apt-get install -y influxdb 

#### 1.3.2.2. Install on Raspbian 
> collector@yourhost:~$ curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -	
> 
> collector@yourhost:~$ source /etc/os-release
> 
> collector@yourhost:~$ test $VERSION_ID = "7" && echo "deb https://repos.influxdata.com/debian wheezy stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
> 
> collector@yourhost:~$ test $VERSION_ID = "8" && echo "deb https://repos.influxdata.com/debian jessie stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
> 
> collector@yourhost:~$  test $VERSION_ID = "9" && echo "deb https://repos.influxdata.com/debian stretch stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
> 
> collector@yourhost:~$ sudo apt update && sudo apt install -y influxdb 


### 1.3.3. Enable InfluxDB auto-start service on boot and start it
> collector@yourhost:~$ sudo systemctl enable influxdb
> 
> collector@yourhost:~$ sudo systemctl start influxdb     

To check the InfluxDB service is running:
> collector@yourhost:~$ sudo systemctl status influxdb 

### 1.3.4. Create cc-collect database and check it
> collector@yourhost:~$ influx
```
Connected to http://localhost:8086 version 1.5.2
InfluxDB shell version: 1.5.2
```
> \> create database "cc-collect"
> 
> \> show databases
```name: databases
name
----
_internal
cc-collect
```
> \> exit



### 1.4. Install Grafana server

### 1.4.1. Install

#### 1.4.1.1. Install on Ubuntu

> collector@yourhost:~$ echo "deb https://packagecloud.io/grafana/stable/debian/ stretch main" | sudo tee /etc/apt/sources.list.d/grafana.list
> 
> collector@yourhost:~$  curl https://packagecloud.io/gpg.key | sudo apt-key add -
> 
> collector@yourhost:~$  sudo apt-get update && sudo apt-get install -y grafana     


#### 1.4.1.2. Install on Raspbian

> collector@yourhost:~$  curl https://bintray.com/user/downloadSubjectPublicKey?username=bintray | sudo apt-key add -
>
>echo "deb https://dl.bintray.com/fg2it/deb stretch main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
> 
> collector@yourhost:~$  sudo apt-get update
> 
> collector@yourhost:~$  sudo apt-get install grafana


### 1.4.2. Enable Grafana auto-start service on boot and start it 

#### 1.4.2.1. Enable and start Grafana service on Ubuntu

> collector@yourhost:~$ sudo systemctl enable grafana-server
> 
> collector@yourhost:~$ sudo systemctl start grafana-server

To check the Grafana service is running:

> collector@yourhost:~$ sudo systemctl status grafana-server 


#### 1.4.2.2. Enable and start Grafana service on Raspbian

######  #todo: ENABLE

> collector@yourhost:~$ sudo service grafana-server start

To check the Grafana service is running:

> collector@yourhost:~$ sudo service grafana-server status

Open web browser and go to http://localhost:3000 

![alt text](https://drive.google.com/uc?id=1ajajwCI7s-Aez7DuXTD2kQtxYUykprDD "Grafana in browser")

Default user/password is **admin/admin**

### 1.4.3. Install Singlestat plugin gor Grafana
> collector@yourhost:~$ sudo grafana-cli plugins install blackmirror1-singlestat-math-panel

### 1.4.4. Restart Grafana server

#### 1.4.4.1. Restart on Ubuntu 

> collector@yourhost:~$ sudo systemctl restart grafana-server  

#### 1.4.4.2. Restart on Raspbian 

> collector@yourhost:~$ sudo service grafana-server restart

### 1.5. Install Node.js 

### 1.5.1. Install 

#### 1.5.1.1. Install Node.js on Ubuntu 

> collector@yourhost:~$  curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
>
> collector@yourhost:~$ sudo apt-get install -y nodejs


#### 1.5.1.2. Install Node.js on Raspbian 

> collector@yourhost:~$ wget https://nodejs.org/dist/v8.11.3/node-v8.11.3-linux-armv7l.tar.xz
>
> collector@yourhost:~$ tar -xvf node-v8.11.3-linux-armv7l.tar.xz
>
> collector@yourhost:~$ sudo cp -R ./node-v8.11.3-linux-armv7l/* /usr/local/


##### Remove downloaded package (only Raspbian):

 
> collector@yourhost:~$ rm -r node-v8.11.3-linux-armv7l*


### 1.5.2. Check Node.js 
To check Node.js is properly installed and you have the right version, run the command 

> collector@yourhost:~$ node -v


---
## 2. Installing cc-collect

### 2.1. Install

> collector@yourhost:~$ git clone https://github.com/miningtools/cc-collect.git
> 
> collector@yourhost:~$ cd cc-collect/
>
> collector@yourhost:~/cc-collect/$ npm install

copy Grafana dashboard file to  /tmp folder for Grafana configuration

> collector@yourhost:~/cc-collect/$ cp ./grafana/ccminer_dashboard.json /tmp

### 2.2 Configure
#### 2.2.1 Enable ccminer API acces on your rigs
#### 2.2.1.1 Run ccminer with config file
Create config file on your mining rig with name "miner.cfg" for example

sample config:
```
{                                                          
    "algo": "x16r",
    "devices": "0,1,2,3,4,5",
    "intensity": "21",
    "url": "stratum+tcp://pool.minecore.pro:3636",
    "user": "RWa29h6rcWZ8bjZSNBk83wjqg7T9CCaYmw",
    "pass": "c=RVN",
    "statsavg":"300"
    "api-allow": "0/0",                                
    "api-bind": "0.0.0.0:4086",
}             
```
##### windows
>  C:\\ccminer> ccminer.exe --config miner.cfg
##### linux 
>  youruser@yourrig:/opt/ccminer$ ./ccminer --config miner.cfg



#### 2.2.1.2 Run ccminer with inline parameters
##### windows
> C:\ccminer> ccminer -a x16r -o stratum+tcp://pool.minecore.pro:3636 -u RWa29h6rcWZ8bjZSNBk83wjqg7T9CCaYmw -p c=RVN --api-bind=0.0.0.0:4086 --api-allow=0/0
##### linux 
>  youruser@yourrig:/opt/ccminer$ ./ccminer -a x16r -o stratum+tcp://pool.minecore.pro:3636 -u RWa29h6rcWZ8bjZSNBk83wjqg7T9CCaYmw -p c=RVN --api-bind=0.0.0.0:4086 --api-allow=0/0

#### 2.2.2. Config cc-collect 

 #todo

### 2.3. Enable cc-collect auto-start service on boot and start it
#### 2.3.1 Create service
#todo
#### 2.3.2 Enable service

> collector@yourhost:~$ sudo systemctl start cc-collect

#### 2.4 Configure Grafana

Login to Grafana with **admin/admin**

![alt text](https://drive.google.com/uc?id=1ajajwCI7s-Aez7DuXTD2kQtxYUykprDD "")

Go to Configuration / Data Sources

![alt text](https://drive.google.com/uc?id=1K_5CvPObiq_47yEBvSpBjHuSAmTWKEFa "")

Click "Add data source" button

![alt text](https://drive.google.com/uc?id=1on4OLH0fnFLc7143f9foUlxSAkrRE1rZ "")

the next page will have to fill in some input fields

Name: cc-collect

Type: InfluxDB 

URL: http://localhost:8086

Check in "Skip TLS Verification" checkbox  

Database: cc-collect

then click Save & Test

![alt text](https://drive.google.com/uc?id=1hvyK8WCrHnAwBGuJJ_eYskSkt4oIz2sO "")


Next Go to Create Dashboard / Import

![alt text](https://drive.google.com/uc?id=1zKwd4LQoqdKUTtvv_voryKe8lh2q1MQu "")


The Grafana.com Dashboard id is 6681

![alt text](https://drive.google.com/uc?id=1fueSQrB81mNgWbXv6MYiYOCgL5AP_EFX "")


click "Import" button

![alt text](https://drive.google.com/uc?id=1kfLbOaPmvFX3gr9Ab-hQ1c7r0yZ1ePe8 "")



---
### 3. Run cc-collect

#### 3.1. Production mode
> collector@yourhost:~/cc-collect/$ export NODE_ENV=prod
> 
> collector@yourhost:~/cc-collect/$ sudo ./cc-collect start 

or 
> collector@yourhost:~/cc-collect/$ sudo systemctl start cc-collect

#### 3.2. Testing mode   

> collector@yourhost:~/cc-collect/$ export NODE_ENV=test
> 
> collector@yourhost:~/cc-collect/$ node index.js

#### 3.3. Development mode   

> collector@yourhost:~/cc-collect/$ export NODE_ENV=dev
> 
> collector@yourhost:~/cc-collect/$ node index.js


---


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

* v1.0.1.

## Authors

* **tsab** - *Initial work* - [MiningTools](https://github.com/miningtools)

See also the list of [contributors](https://github.com/miningtools/cc-collect/contributors) who participated in this project.

## License

This project is licensed under the GNU License - see the [LICENSE.md](https://github.com/miningtools/cc-collect/blob/master/LICENSE) file for details

## Acknowledgments

* Inspiration
* etc
 
