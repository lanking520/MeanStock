# Meanstock Web App

## Current Progress Front End
- Using Angular JS to build the single page app
- $Http for JSON Request
- $Scope for basic data storage

## Progress Backend
- Running MongoDB with Node.js

## Requirement (Mac)
On amazon EC2 machince
[Start EC2](http://www.lauradhamilton.com/how-to-set-up-a-nodejs-web-server-on-amazon-ec2)
[Fix No DB folder](http://stackoverflow.com/questions/7948789/mongodb-mongod-complains-that-there-is-no-data-db-folder)
[Install MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
### System Environment
```
sudo apt-get install build-essential curl git python-setuptools ruby

brew install node

brew install mongodb

npm install -g grunt-cli

npm install -g bower

gem install compass

```
### Enable IP forwarding
```
sudo sysctl -w net.ipv4.ip_forward=1
```
### Module in server
```
npm install --save express
npm install --save mongoose
npm install --save resourcejs
npm install --save method-override
npm install --save body-parser
npm install --save lodash
```
## Running order
In order to run this web app, you need mongodb setup in the server and have a name as meanstock
```
# When you need your app to work in the background 
screen
use ctrl A+D to exit
use exit; to shut down the screen
```
