git pull origin main
npm i
npm run build
pm2 stop cv-project-server 
pm2 delete cv-project-server
pm2 save
pm2 start start.config.js
pm2 save
