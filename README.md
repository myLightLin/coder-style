# 程序员穿搭小程序

原生微信小程序 + TypeScript 首版实现，提供程序员日常/面试/见客户等场景的简洁穿搭建议。

## 目录

- `miniprogram/data`：静态选项、文案和穿搭库
- `miniprogram/services`：推荐与解释逻辑
- `miniprogram/utils`：本地存储与常量
- `tests`：规则、存储、页面关键交互测试

## 运行

1. `npm install`
2. `npm run test`
3. 使用微信开发者工具打开仓库根目录

## 核心流程

首页 -> 生成页 -> 结果页 -> 详情页 -> 收藏/最近查看 -> 我的
