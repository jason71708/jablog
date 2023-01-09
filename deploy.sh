#!/bin/bash
yarn run build
# Upload other file to s3 first
aws s3 sync ./build s3://jablog-website --profile my-account
# Remove all .html files extension in other to remove .html from the url in s3 & cloudfront
find ./build -iname "*.html" -exec rename 's/.html//' '{}' \;
aws s3 sync ./build s3://jablog-website --profile my-account --exclude '.*' --content-type 'text/html'

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