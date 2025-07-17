# threeDemo

基于 Vue 3 + Vite + element + Pinia 的移动端项目。

## 环境要求

- Node.js 版本 >= 20.0.0
- pnpm 版本 >= 8.0.0
- 推荐使用 VSCode 编辑器，并安装 Volar 插件

## 项目设置

### 安装依赖
```sh
pnpm install
```

### 开发环境启动
```sh
pnpm dev          # 开发环境
pnpm dev:pro      # 生产环境配置
```

### 项目打包
```sh
pnpm build        # 开发环境打包
pnpm build:pro    # 生产环境打包

## Git 提交规范

提交格式：`<type>: <description>`

类型说明：
- feat : 新功能
- fix : 修复bug
- docs : 文档改变
- style : 代码格式改变
- refactor : 某个已有功能重构
- perf : 性能优化
- test : 增加测试
- build : 改变了build工具 如 grunt换成了 npm
- revert : 撤销上一次的 commit
- chore : 构建过程或辅助工具的变动
## 注意事项

1. **开发规范**
   - 组件名使用大驼峰/小驼峰命名
   - API 请求统一在 `src/api` 目录下管理
   - 使用 `setup` 语法糖编写组件
   - 路由配置遵循模块化原则
   