---
title: 在手機瀏覽器上透過 Deep Link 打開其他應用程式
description: 簡單介紹 Deep Link 來由，iOS 的 Universal Link 與 Android 的 App Link 並應用在網頁上能打開手機 APP 。
tags: [Front-end]
# image: https://i.stack.imgur.com/plYwy.png
---

之前做 [NFT 畫廊](https://d3idtkbaj4rnb4.cloudfront.net/) Side Project 時需要在手機網頁上開啟 MetaMask APP 或是引導使用者去安裝該 APP 才能在此畫廊挖 NFT 。

需求與應用場景在擁有網頁與原生手機 APP 產品的公司非常常見，在手機上引導使用者去安裝或打開 APP ，而 Deep Link 就是為此而生。

下面先介紹一些 Deep Link 相關的實作。

<!--truncate-->

## URL Scheme

實現 Deep Link 的方法之一。

在手機裝置上透過點擊一個定義好並註冊的 Custom URL Scheme (例如：instagram://)，就能開啟 APP。

但缺點是註冊的 URL Schema 有可能跟其他 APP 衝突，假設有個假 IG APP 也是註冊 `instagram://` 。有可能在點擊該 URL 時開啟的卻是假 IG。

還有就是如果尚未安裝該 APP，則點擊後不會發生任何事情，程式端也沒有 `fallback` 之類的機制。

這時早期的做法都是設個 `setTimeout`，幾秒過後若網址沒變的話就跳轉到該 APP 的下載頁面。

## Universal Link & App Link

實現 Deep Link 的方法之二。

iOS 系統為了解決上述 URL Scheme 的問題故實作了 Universal Link ，同理 Android 系統則實作了 App Link 上，兩者在概念上相似。

當使用者點擊 Universal Link 時，若沒安裝該 APP 則會引導去 APP Store，有則會開啟該 APP。

而 Universal Link 的註冊是需要 APP 提供商在自己的 Domain 的 `/apple-app-site-association` 路徑提供 *Apple App Site Association File (AASA)* 檔案。

該檔案會寫上該 APP 的發行 ID、定義好哪些路徑可以被使用。

當我們下載 APP 或更新時，都會去該路徑抓取 AASA 檔案建立 Universal Link 相關的資料。

也因為 Universal Link 是跟 APP 的發行 ID 有關聯，所以不會有 URL Scheme 那樣定義衝突的情況。

Android 的 App Link 運作方式也類似於 iOS 的 Universal Link。

接下來提供些常見 APP 的 Deep Link。

## Twitter

開啟 Twitter - [twitter://](twitter://)

開啟個人頁面 - [twitter://user?screen_name=twitter](twitter://user?screen_name=twitter) (`screen_name` 後面可代換成自己的，非常實用，提高曝光與轉換率)

## Facebook

開啟 FB - [fb://](fb://)

開啟個人頁面 - [fb://profile](fb://profile)

## Instagram

開啟 IG - [instagram://](instagram://)

開啟 IG 相機 - [instagram://camera](instagram://camera)

開啟個人頁面 - [instagram://user?username=instagram](instagram://user?username=instagram) (`username` 後面可代換成自己的，非常實用，提高曝光與轉換率)

## Line

開啟 Line - [https://line.me/R/](https://line.me/R/) (官方推薦使用)

開啟 Line - [line://](line://) (官方將棄用)

開啟 Line 官方帳號頁面 - [https://line.me/R/ti/p/@linedevelopers](https://line.me/R/ti/p/@linedevelopers) (後面 `@linedevelopers` 可換成其他官方帳號，非常實用，提高曝光與轉換率)

## MetaMask

開啟 MetaMask APP 內的瀏覽器並導至該網頁 - [https://metamask.app.link/dapp/www.google.com](https://metamask.app.link/dapp/www.google.com) (Google 網址可換成其他，此連結應用場景主要是在手機瀏覽器環境下沒有像電腦那樣有 google extensions 可用，所以得要在 MetaMask APP 內的瀏覽器才能在網頁程式中取得 `window.ethereum` 物件)

## Demo

最後提供 [Demo 網站](https://utils.jasonzhuang.com/deeplink) 可直接在手機上測試，最底下還可輸入自訂網址。

## 注意事項

實測後發現在手機 Chrome 中點擊連結都可直接跳轉到該 APP，而 Safari 一定都會先跳提示詢問是否要開啟該 APP。

在非行動裝置上點擊 Custom URL Scheme 則不會有作用，Universal Link 或 App Link 則會依設定導到官網。

實際應用場景可搭配 [react-device-detect](https://www.npmjs.com/package/react-device-detect) 套件偵測目前裝置是什麼來顯示對應 URL。

## 參考資料

- [Line URL Scheme](https://developers.line.biz/en/docs/messaging-api/using-line-url-scheme/)
- [Facebook URL Scheme Gist](https://gist.github.com/nhnam/5f106eaebff6366c0e21578c40515094)
- [Universal Link](https://developer.apple.com/library/archive/documentation/General/Conceptual/AppSearch/UniversalLinks.html)
- [App Link](https://developer.android.com/training/app-links)
- [https://stackoverflow.com/questions/10424275/how-can-i-open-a-twitter-tweet-using-the-native-twitter-app-on-ios](https://stackoverflow.com/questions/10424275/how-can-i-open-a-twitter-tweet-using-the-native-twitter-app-on-ios)
- [https://stackoverflow.com/questions/21295051/link-on-a-webpage-to-open-instagram-app](https://stackoverflow.com/questions/21295051/link-on-a-webpage-to-open-instagram-app)
- [https://stackoverflow.com/questions/34564211/open-facebook-page-in-facebook-app-if-installed-on-android/34564284](https://stackoverflow.com/questions/34564211/open-facebook-page-in-facebook-app-if-installed-on-android/34564284)