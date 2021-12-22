---
title: 'Using localstorage in React Native'
tags:
 - React Native
 - localstorage
sidebar_position: 3
image: img/logo.svg
keywords: [React Native, localstorage]
---

# Using localstorage in React Native
> 在 React Native 執行環境中，不像在瀏覽器有 `window` 物件及底下很多方法可以使用。例如 `localstorage`、`alert` 等等。
> 使用 `localstorage` 算是蠻常見的應用場景，本篇將簡介在 React Native 使用 [Async Storage](https://react-native-async-storage.github.io/async-storage/) 套件處理各個手機系統上的本機端儲存需求。

## 安裝
```bash
yarn add @react-native-async-storage/async-storage
```

## 安裝 iOS 用的套件
以 [Async Storage](https://react-native-async-storage.github.io/async-storage/) 為例，在 iOS 或 Android 系統上儲存資料在本機端用的程式碼一定不一樣，故需要在各系統上安裝該套件。(也需要套件有支援該平台，像 [Async Storage](https://react-native-async-storage.github.io/async-storage/) 有支援 iOS、Android 、Windows 與 macOS)

使用 CocoaPods 安裝 iOS 環境中的 `RNAsyncStorage` 套件：
```bash
npx pod-install
```

接著直接 `yarn ios` 啟用就好。

若 React Native <= 0.59 則需要手動連結：
```bash
react-native link @react-native-async-storage/async-storage
```

> React Native 0.60+ 有自動連結 [CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) 的功能，所以不用額外執行 `react-native link`

> `link` 的功能也能拿來連結要在各個系統平台裡用的字型或其他靜態資源，甚至是連結自己寫的套件。

## 使用

> 以下所介紹的所有方法皆是 return `Promise object` (**非同步**)！

### 引入
```js
import AsyncStorage from '@react-native-async-storage/async-storage';
```

### setItem

若 `@storage_Key` 已存在，則會**覆蓋**原有的值，若不存在則會新增。

```js
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // handling error
  }
}
```

> 記得要存字串，若要存物件需要先 `JSON.stringify()` 轉字串。

### getItem

```js
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key')
    if(value !== null) {
      // value previously stored
    }
  } catch(e) {
    // handling error
  }
}
```

### removeItem

```js
const removeData = async () => {
  try {
    const value = await AsyncStorage.removeItem('@storage_Key')
  } catch(e) {
    // handling error
  }
}
```

### clear
清除所有儲存在本地的資料，實務上不常用。

```js
const clearAllData = async () => {
  try {
    const value = await AsyncStorage.clear()
  } catch(e) {
    // handling error
  }
}
```

## 總結
[Async Storage](https://react-native-async-storage.github.io/async-storage/) 使用上與 `window.localstarge` 相似，也還有其他實用的方法可以使用 ([multi 系列](https://react-native-async-storage.github.io/async-storage/docs/api#multiget))。

本文也藉由實際安裝並執行此簡易的套件來了解在 React Native 專案中安裝及使用套件的眉角：
- 在日後選用套件時記得要查看支援的平台是否與要開發的平台相符。
- 各個平台的安裝流程也各有差異。