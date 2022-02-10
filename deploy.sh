#!/bin/bash
yarn build
aws s3 sync ./build s3://jablog-website --profile my-account

echo "Do you want to clean cloudfront cache?"
PS3='Please enter your choice: '
options=("Yes" "No")
select opt in "${options[@]}"
do
    case $opt in
        "Yes")
            aws cloudfront create-invalidation --distribution-id ${ID} --paths "/*" --profile my-account
            break
            ;;
        "No")
            break
            ;;
        *) echo "invalid option $REPLY, please input number.";;
    esac
done