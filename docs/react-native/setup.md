---
title: '建置 React Native 開發環境'
tags:
  - React Native
sidebar_position: 1
keywords: [React Native]
---

# 建置 React Native 開發環境

> 建議搭配官方文件觀看，本文以 iOS 為例，主要紀錄安裝套件時所遇到的問題與簡略說明建置流程。

## 環境套件安裝

### NodeJs & watchman

```bash
brew install node
brew install watchman
```

[Homebrew](https://brew.sh/index_zh-tw) 是使用在 macOS 的套件管理工具，用來安裝 macOS 上缺少的套件，安裝好後可用 `brew` 指令安裝套件。

Homebrew 這邊遇到個坑，macOS 升至 Big Sur 後，就和舊版 Homebrew 不相容了，故參考 stackoverflow 上的[解法](https://stackoverflow.com/questions/64821648/homebrew-fails-on-macos-big-sur)。
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
接著看 log 輸出訊息照著下其他指令。 (要走的步驟很多而且要等很久)

Node 應該不用解釋，要注意 React Native 目前要 Node 12 以上的版本。

Watchman 是由 Facebook 開發的工具，用來監聽檔案變更，類似 Webpack 的 hot reload、Node 的 nodemon。

### Xcode

在 [APP Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12) 下載，開發 iOS 相關應用都需要它。

隨著 macOS 系統升級，Xcode 也需要更新 (App store)，Command Line Tools 也需要更新：`xcode-select --install`

> 這三者關係是往前相依的，macOS 版本太舊是沒辦法升級 Xcode 版本的。

> 再補充一個常見問題：macOS 升級後，Git 沒辦法使用的情況是因為 Command Line Tools 也需要更新。

### iOS Simulator

打開 Xcode，左上角選單選 Preferences 打開設定視窗，視窗上方 Navbar 選擇 Components，下方內容就可以下載與選擇 ios 版本。

### Command Line Tools
同 iOS Simulator 步驟，Navbar 這次要選擇 Locations，下方內容就可以選擇 Command Line Tools 版本。(建議都選最新)
### CocoaPods

Xcode 上專案的套件管理工具

```bash
sudo gem install cocoapods
```

上述套件除了 watchman 以外都是必裝的。

## 建立 React-Native 專案
指令： `npx react-native init <Your project name>`
```bash
npx react-native init AwesomeProject
```

> npx 是一次性的安裝指令，它會先下載寫好的安裝腳本，接著執行，然後刪除，僅剩下安裝好的專案。

也可以安裝特定版本：
```bash
npx react-native init AwesomeProject --version X.XX.X
```

也可以指定要用哪個專案模板：
```bash
npx react-native init AwesomeTSProject --template react-native-template-typescript
```

## 執行 React-Native

在專案根目錄下：

```bash
npx react-native start
```

此指令主要是啟動 Metro Bundler，每次更改程式碼時將 JavaScript 打包，類似於 Webpack。

> 若有裝 `yarn` 則可以直接 `yarn start`

將程式碼打包好後要轉換成 iOS 平台可用的程式就需要建置 iOS APP。
開啟另個終端機執行：
```bash
npx react-native run-ios
```

> 若有裝 `yarn` 則可以直接 `yarn ios`

跑一下之後就可以看到 iOS Simulator 啟動並在上面跑 React-Native 的 APP 囉！