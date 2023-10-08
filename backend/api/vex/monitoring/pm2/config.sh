# deve ser instalado de forma global na máquina real, vm ou container

# vm ou máquina real
npm i -g pm2

# container
docker exec -it container_name /bin/bash
npm i -g pm2

# comandos do pm2 
npm i -g pm2
pm2 start [file.js]
pm2 start [file.js] --watch
pm2 stop  [file.js]
pm2 status
pm2 start [file.js] --name [process_name]
pm2 ls
pm2 restart [process_name]
pm2 delete  [process_name]
pm2 monitor
pm2 monit