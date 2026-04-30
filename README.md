# 程序员穿搭小程序

原生微信小程序 + TypeScript 首版实现，提供程序员日常/面试/见客户等场景的简洁穿搭建议。

## 目录

- `miniprogram/data`：静态选项、文案和穿搭库
- `miniprogram/services`：推荐与解释逻辑
- `miniprogram/utils`：本地存储与常量
- `tests`：规则、存储、页面关键交互测试

## 运行

前置要求：

- Node.js `>= 18`
- npm `>= 9`

标准流程：

1. `npm install`
2. `npm run test`
3. 使用微信开发者工具打开仓库根目录

## 测试排障

如果执行 `npm run test` 时出现 `vitest: not found`，通常不是测试代码损坏，而是安装阶段没有安装 `devDependencies`。

常见原因：

- 安装时带了 `--omit=dev`
- 环境变量中设置了 `NODE_ENV=production` 后再执行 `npm install`

排查与修复：

1. 先确认 `node_modules/.bin/vitest` 是否存在
2. 清理后重新按开发模式安装：
   `rm -rf node_modules package-lock.json && npm install`
3. 若需要保留锁文件，则改为：
   `rm -rf node_modules && npm install`

注意：本项目的测试命令依赖 `vitest` 和 `@vitest/coverage-v8`，它们都在 `devDependencies` 中；生产模式安装不会包含这些包，因此测试无法运行。

## 核心流程

首页 -> 生成页 -> 结果页 -> 详情页 -> 收藏/最近查看 -> 我的
