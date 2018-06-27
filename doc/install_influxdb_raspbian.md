
# Install InfluxDB on Raspbian 

### Install

> user@host:~$ curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -	
> 
> user@host:~$ source /etc/os-release
> 
> user@host:~$ test $VERSION_ID = "7" && echo "deb https://repos.influxdata.com/debian wheezy stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
> 
> user@host:~$ test $VERSION_ID = "8" && echo "deb https://repos.influxdata.com/debian jessie stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
> 
> user@host:~$  test $VERSION_ID = "9" && echo "deb https://repos.influxdata.com/debian stretch stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
> 
> user@host:~$ sudo apt update && sudo apt install -y influxdb 

### Enable auto-start service 
> user@host:~$ sudo systemctl enable influxdb

### Start
> user@host:~$ sudo systemctl start influxdb     

### Check InfluxDB service 
> user@host:~$ sudo systemctl status influxdb 
