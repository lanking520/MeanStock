#!/bin/bash
git clone https://github.com/lanking520/MeanStock.git
mongod & node MeanStock/server/server.js  && fg