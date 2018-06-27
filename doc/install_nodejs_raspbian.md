# Install Node.js on Raspbian 

### Download, unpack, copy

> user@host:~$ wget https://nodejs.org/dist/v8.11.3/node-v8.11.3-linux-armv7l.tar.xz
>
> user@host:~$ tar -xvf node-v8.11.3-linux-armv7l.tar.xz
>
> user@host:~$ sudo cp -R ./node-v8.11.3-linux-armv7l/* /usr/local/

### Remove downloaded package
 
> user@host:~$ rm -r node-v8.11.3-linux-armv7l*

### Check Node.js version

> user@host:~$ node -v

