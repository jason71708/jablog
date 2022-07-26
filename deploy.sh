#!/bin/bash
yarn run build --locale zh-TW
aws s3 sync ./build s3://jablog-website --profile my-account --exclude '*.html'
find ./build -iname "*.html" -exec rename 's/.html//' '{}' \;
aws s3 sync ./build s3://jablog-website --profile my-account --exclude '.*' --content-type 'text/html'
cp ./build/index ./build/index.html
aws s3 cp ./build/index.html s3://jablog-website --profile my-account

echo "Do you want to clean cloudfront cache?"
PS3='Please enter your choice: '
options=("Yes" "No")
select opt in "${options[@]}"
do
    case $opt in
        "Yes")
            aws cloudfront create-invalidation --distribution-id E3OL6DGTV40HNW --paths "/*" --profile my-account
            break
            ;;
        "No")
            break
            ;;
        *) echo "invalid option $REPLY, please input number.";;
    esac
done