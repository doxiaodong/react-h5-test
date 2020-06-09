#!/bin/bash
export NODE_PATH=/home/xiaoju/node-v8.9.1-linux-x64:/home/xiaoju/node-v8.9.1-linux-x64/lib/node_modules
export PATH=/home/xiaoju/node-v8.9.1-linux-x64/bin:$PATH

echo $PATH

rm -rf output
mkdir -p ./output

npm install --registry=http://registry.npm.xiaojukeji.com

if [[ $env == "test" ]]
then
  npm run dev-build
else
  npm run build
fi

mv dist/* output/
cp ./server.conf ./output/

ret=$?
if [ $ret -ne 0 ];then
    echo "===== npm build failure ====="
    exit $ret
else
    echo -n "===== npm build successfully! ====="
fi

