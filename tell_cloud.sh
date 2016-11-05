#!/bin/bash
rm -rf MeanStock
git clone https://github.com/lanking520/MeanStock.git
mongod & bg
node MeanStock/server/server.js  & bg