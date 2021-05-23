#!/bin/bash

server1="34.67.194.167"

echo "Generating Files"
rm -rf build/
yarn build && 
cp -rv server build/ &&
cp -rv bot1 build/ &&
cp .htaccess build/ &&
echo "Site generated in build/" &&


echo "Do you want to upload generated files into server? [y/n]" &&
read choice
if [[ $choice == 'y' ]]; then
    echo "uploading ..."
    rsync -rva build/ raptor@$server1:/home/raptor/twitterbot/
fi
