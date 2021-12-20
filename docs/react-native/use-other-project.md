---
title: '[Note] Clone 其他 React-Native 專案跑在本地端'
tags:
 - ReactNative
sidebar_position: 2
---

# Clone 其他 React-Native 專案跑在本地端

https://stackoverflow.com/questions/55235825/error-failed-to-build-ios-project-we-ran-xcodebuild-command-but-it-exited-wit

https://github.com/CheesecakeLabs/ReactNativeCklExample
## How to run locally

- Navigate to the project folder: `cd ./ReactNativeCklExample`;
- Install project dependencies: `yarn`;
- Install CocoaPods iOS packages: `cd ios && pod install`;
- Run in iOS Simulator: `yarn ios`;
- Run in Android Simulator: `yarn android`;