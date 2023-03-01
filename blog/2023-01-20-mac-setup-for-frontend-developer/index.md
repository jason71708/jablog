---
title: 從零開始的 2023 年 前端工程師 Mac 配置
description: 統整幾個前端工程師在拿到新電腦時所需要的步驟與配置。
tags: [frontend]
image: https://i.stack.imgur.com/plYwy.png
---

最近心血來潮把手上的 Macpro 重灌看看，因為從剛開始學程式以來這台電腦已經被我安裝了各種各樣奇怪的東西，速度也比以前慢了許多。在買新電腦前想說重設一次看速度有沒有改善，順便也能記錄一下從零開始的配置省下以後要配置新電腦時查東查西的時間。

<!--truncate-->

## 停止 iCloud

System Preferences -> Apple ID → iCloud

使用上電腦常會因為 iCloud 在同步更新檔案而造成過熱，而且已經有用個人硬碟進行備份，所以也沒有雲端備份的需求。

## 關閉螢幕快捷鍵

System Preference -> Mission Control -> Hot Corners -> change "Quick Note" to "-"

滑鼠每次移到螢幕右下角有時會出現 Note 的快捷鍵，時常擾亂關閉全螢幕或點擊其他東西 (蘋果的 UX 怎麼越做越差了...)

## 安裝 Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew update
```

## 下載應用程式

```bash
brew install --cask \
  firefox \
  brave-browser \
  iterm2 \
  visual-studio-code \
  docker
```

## 下載套件

```bash
brew install \
  wget \
  exa \
  git \
  yarn \
  `commitizen` \
  nvm \
  pnpm \
  graphicsmagick \
  rename
```

*   `wget` 檔案下載指令
*   `exa` 替代 'ls' 指令，更好地顯示
*   `git` 程式版控
*   `pnpm` 解決 node_module 在本機下載與存放問題
*   `yarn` 比 npm 優化下載速度與效能，與 npm 擇一使用即可
*   `commitizen` Git 規範化訊息撰寫
*   `nvm` Node.js 版控
*   `graphicsmagick` 圖片處理相關，目前未安裝

## ZSH 安裝

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
omz update
```

zsh 設定檔有任何更新，需要下指令使其吃最新的版本

```bash
source ~/.zshrc
```

## NVM 指令路徑設置

在 `~/.zshrc` 中加入下列幾行

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh" # This loads nvm
[ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm" # This loads nvm bash_completion
```

## Terminal Theme & Font

```bash
brew install starship
echo 'eval "$(starship init zsh)"' >> ~/.zshrc
brew tap homebrew/cask-fonts
brew install --cask font-hack-nerd-font
```

iTerm2 設置字型：Preferences → Profile → Text → Font: font-hack-nerd-font.

## ZSH 好用套件

[zsh-completions](https://github.com/zsh-users/zsh-completions)
[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)
[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)


## Git 設定

```bash
git config --global user.name "Your Name"
git config --global user.email "you@your-domain.com"
```

## VSCode Extensions

* Material Icon Theme
* Prettier ESLint
* Color Picker
* ES7+ React/Redux/React-Native snippets
* Live Server
* Markdown All in One
* SVG

VSCode Setting

```json
{
    "breadcrumbs.enabled": false,
    "files.trimTrailingWhitespace": true,
    "workbench.iconTheme": "material-icon-theme",
    "workbench.statusBar.visible": true,
    "workbench.editor.enablePreview": false,
    "workbench.activityBar.visible": false,
    "workbench.editor.restoreViewState": true,
    "terminal.integrated.fontFamily": "Hack Nerd Font Mono",
    "editor.fontFamily": "Hack Nerd Font Mono",
    "editor.fontSize": 14,
    "editor.tabSize": 2,
    "editor.insertSpaces": true,
    "editor.detectIndentation": false,
    "editor.renderWhitespace": "none",
    "editor.scrollBeyondLastLine": true,
    "editor.minimap.enabled": false,
    // prettier
    "editor.formatOnSave": true,
    "[javascript]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
    },
    "[javascriptreact]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
    },
    "[typescript]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
    },
    "[typescriptreact]": {
      "editor.formatOnSave": true,
      "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
    },
    // eslint
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    // auto generated
    "explorer.confirmDragAndDrop": false,
    "editor.formatOnPaste": true,
  }
```

## SSH

如果還沒有 ssh 資料夾在根目錄的話

```bash
mkdir ~/.ssh
```

進到該資料夾並建立一組 ssh key

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

`enter passphrase (empty for no passphrase): [Type a passphrase]` 打上想設的密碼，之後用到此 Key 需要打上同樣密碼

接著將 Public Key 複製

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

接著至 Github 設定 SSH 即可

## Node.js

```bash
nvm install <current lts version>
```

檢查 Node & Npm 版本

```bash
node -v && npm -v
```

顯示已安裝的  Global Packages

```bash
npm list -g --depth=0
```

## AWS CLI

參照當前最新[官方文件](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

安裝：

```bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg ./AWSCLIV2.pkg -target /
```

檢查：

```bash
which aws
aws --version
```

設定 Access Key

```bash
aws configure # 依序輸入從 IAM 建立的 User Access Key 與相關設定。
```

檢查：

```bash
cat ~/.aws/credentials
cat ~/.aws/config
```