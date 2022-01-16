---
slug: 2021-12-29-aws-cloudwatch-alarm-to-slack
title: 在 AWS 設置監控服務並串接通知到 Slack 頻道上
description: 使用 AWS CloudWatch 監控 server 運行狀況，並在警示發生時發送通知到 Slack 頻道上。
tags: [AWS, CloudWatch, Lambda, SNS, KMS, IAM, Slack]
draft: true
---

因應最近公司的需求，查了一下發現有現成的串接 Slack 頻道的 Lambda blueprint 可以用，但比較麻煩的是整個流程有用到蠻多服務的：CloudWatch、SNS、KNS、Lambda、IAM...等等，所以稍微紀錄並整理一下。
<!--truncate-->

## 架構
主要是監控 Load Balancer 的 healthy check 狀況，在健康狀態低於設定的數值時會發送 Email 與打通知到 Slack 頻道。

1. 建立 Lambda Function，這邊使用一個叫 `cloudwatch-alarm-to-slack-python` 的 blueprint。
2. 建立一個 SNS Topic。
3. SNS Subscriptions 有兩個，一個 Protocol 設 Email、另個設 Lambda，並訂閱同一個 SNS Topic。
4. 在 CloudWatch 設置 alarm 監控對應 Load Balancer 的 healthy check 狀況，警示發生時打通知到 SNS Topic。

大致上是這樣，實作上還需要 IAM 與 KMS 的設置，稍後會提到。

## 實作

### 建立 Topic

- 至 SNS 建立 Topic
- type 選 Standard (選 FIFO 會無法讓 Lambda 訂閱)
- 其他不用特別設定，有特殊需求再設

### 建立 Subscriptions

目前通知設定做兩種：
- Email
- Lambda (打通知到 Slack Channel)

#### Email
- 至 SNS Subscriptions 新建 subscription
- 訂閱剛剛建的 Topic
- 選 email 通知，設置 email (只能設一個)
- 建完後到 email 信箱收信點確認訂閱連結
- 回 SNS Subscriptions 看 Status 應該要是 Confirmed
