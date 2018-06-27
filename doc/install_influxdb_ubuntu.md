
# Install InfluxDB on Ubuntu

### Install 

> user@host:~$ curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
> 
> user@host:~$ source /etc/lsb-release
> 
> user@host:~$ echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list 
> 
> user@host:~$ sudo apt-get update && sudo apt-get install -y influxdb 

### Enable auto-start service
> user@host:~$ sudo systemctl enable influxdb

### Start InfluxDB service

> user@host:~$ sudo systemctl start influxdb     

### Check InfluxDB service

 > user@host:~$ sudo systemctl status influxdb     