---
title: '[Note] Linux which 指令'
tags:
  - Linux
sidebar_position: 1
---

# Linux which 指令

Linux `which` 指令是用來查找可執行的指令的檔案位置，像是 node、npm 等等。

`which` 的查找範圍是 **`PATH` 環境變數**中定義的檔案目錄底下

## 什麼是 PATH 環境變數

在 Linux 系統中，`PATH` 是環境變數，用來告訴 shell 或其他程序該在哪個目錄底下搜尋可執行的檔案。

若有多個目錄則會以 `:` 分隔，目錄路徑為絕對路徑。

可用 `echo` 指令查看 `PATH` 為多少：
```bash
echo $PATH
```

輸出：
```
/usr/local/sbin:/Users/username/.nvm/versions/node/v10.21.0/bin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

所以當我們執行 `node -v` 要查看目前 node 版本時，終端機就會在 `PATH` 中定義的目錄底下找 node 的執行檔。

> 我們也可以自己寫可執行的檔案並放在固定路徑，將該固定路徑也新增至 `PATH` 中，假設檔案名稱為 cc (custom command)，即可在終端機中下指令 `cc complete homework`!

## 使用 which 指令
`which` 指令語法如下：
```bash
which [OPTIONS] NAME...
```

假設要找目前 Node 的執行檔案在哪：
```bash
which node
```
輸出：
```
/Users/username/.nvm/versions/node/v10.21.0/bin/node
```

可給多個參數，會依序列出：
```bash
which node npm yarn touch
```
輸出：
```
/Users/username/.nvm/versions/node/v10.21.0/bin/node
/Users/username/.nvm/versions/node/v10.21.0/bin/npm
/Users/username/.nvm/versions/node/v10.21.0/bin/yarn
/usr/bin/touch
```

預設只會輸出第一個找到的檔案路徑，若要列出所有符合的檔案路徑則需要加 `-a`：
```bash
which -a npm
```
輸出：
```
/Users/username/.nvm/versions/node/v10.21.0/bin/npm
/usr/local/bin/npm
```

像上述查找 npm 卻有多個檔案路徑輸出，假設是非 node 底下的 npm 檔案排在第一個的話，很容易發生執行 npm 時與 node 版本不相容的問題。
建議在安裝時皆統一使用 nvm 切換 node 環境，在該 node 環境下安裝。

## 總結

`which` 是很方便的指令，用來排查目前執行環境中各指令是使用哪邊的執行檔，~~也能看自己以前亂裝了各種不同版本的檔案~~。