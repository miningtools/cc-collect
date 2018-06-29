# Download & config preinstalled vmware image (Ubuntu 18.04 LTS)


#### 1. config your rigs
enable ccminer API acces 
 
 **api-allow** & **api-bind** are your friends 

sample config file :
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
##### start ccminer on windows
>  C:\\ccminer> ccminer.exe --config miner.cfg
##### start ccminer on linux 
>  user@rig:/opt/ccminer$ ./ccminer --config miner.cfg

or without config file 
##### windows
> C:\ccminer> ccminer -a x16r -o stratum+tcp://pool.minecore.pro:3636 -u RWa29h6rcWZ8bjZSNBk83wjqg7T9CCaYmw -p c=RVN --api-bind=0.0.0.0:4086 --api-allow=0/0
##### linux 
>  user@rig:/opt/ccminer$ ./ccminer -a x16r -o stratum+tcp://pool.minecore.pro:3636 -u RWa29h6rcWZ8bjZSNBk83wjqg7T9CCaYmw -p c=RVN --api-bind=0.0.0.0:4086 --api-allow=0/0



#### 2.  [Download preinstalled vmware image (Ubuntu 18.04 LTS)](https://mega.nz/#!7WRyTYKC!TFUraHCxxRzJLZYom7Naf7zqr9HzZ_VABKJYwP2JGy0)


#### 3. unrar UBUNTU-COLLECTSRV.rar
#### 4. import UBUNTU-COLLECTSRV.ovf to vmware player
#### 5. start virtual machine and log in with ubuntu/ubuntu
#### 6. open terminal window


#### 7. config cc-collect

>ubuntu@collectstrv:~$ sudo su - collector
>
>collector@collectstrv:~$ cd cc-collect/config
>
>collector@collectstrv:~/cc-collect/config/$ cp hosts.config.sample.js hosts.config.js
>

modify hosts config file
> collector@collectstrv:~/cc-collect/config/$ nano hosts.config.js 
```
...
  { name: 'rig1a', address: 'localhost', port: 4086 },
  { name: 'rig1b', address: '127.0.0.1', port: 4087 },
  { name: 'rig2', address: '10.236.6.200', port: 4087 },
...
```
enable cc-collect service auto-start

> collector@host:~$ sudo systemctl enable cc-collect

start cc-collect service

> collector@host:~$ sudo systemctl start cc-collect

check cc-collect service

> collector@host:~$ sudo systemctl status cc-collect



#### 8. open firefox browser, go to http://localhost:3000 and log in with admin/admin

#### 9. open Ccminer Dashboard
#### 10. enjoy it.
 
 
![alt text]( https://drive.google.com/uc?id=17jISPvGw8gNrFWY1PF0ZnjHbY77w2wQJ "")
