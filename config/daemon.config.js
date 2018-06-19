var daemon={
    main: "index.js",                    
    name: "cc-collect",                   
    pidfile: "/var/run/cc-collect.pid",  
//    user: "collector",                 
//    group: "collector",                
    silent: true                         
}  

module.exports=daemon;                                    
