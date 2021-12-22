---
title: 'Clone 其他 React Native 專案跑在本地端'
tags:
 - React Native
sidebar_position: 2
keywords: [React Native]
---

# Clone 其他 React Native 專案跑在本地端
> 不同於一般 Web 前端專案通常只要 `yarn` 或是 `npm install` (Node 版本也要對) 安裝好套件後就可在本地端執行。React Native 專案跑在本地端需要多一些步驟，本文以 iOS 為例簡述在要跑的指令與筆者碰過的問題。

## 安裝套件
至該專案根目錄下 `yarn` 或是 `npm install`。

## 安裝 iOS 套件
```
cd ios && pod install
```
> 由於安裝 iOS 套件有用到 **cocoapods** 的指令 `pod`，故在此步驟出錯的話需要先安裝 **cocoapods** 套件。

> 建議先閱讀並照著該筆記安裝所需工具：[建置 React Native 開發環境](./setup.md)

## 執行
切回根目錄下 `yarn start`

另開新終端機 `yarn ios`
