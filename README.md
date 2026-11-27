# 王恒 (James Wang) — 个人品牌博客网站

定位：**工业数字化与 AI 商业化实践者（Industrial Digitalization & AI Practitioner）**。
基于 Hexo 静态网站生成器构建，采用定制化的 **Editorial + Modern Technology** 设计系统，集个人品牌展示、行业观点（Insights）、技术实践（Technology）、项目作品集（Projects）、思考随笔（Thoughts）与演讲合作（Speaking）于一体。

---

## 一、本地运行与开发

```bash
# 1. 安装依赖
npm install

# 2. 启动本地预览服务 (默认 http://localhost:4000)
npm run server

# 3. 清理并生成静态产物到 public/
npm run build

# 4. 检查履历与文档中的待补充 TODO 项
npm run check
```

---

## 二、内容管理系统 (CMS) 使用指南

本站点采用 **Git + Markdown + YAML 数据驱动** 的轻量级内容管理架构，无需数据库即可安全维护所有文章、项目与首页推荐内容。

### 1. 创建与发布文章

```bash
# 新建正式文章
npx hexo new post "文章标题"

# 新建草稿（不会在生产构建中发布）
npx hexo new draft "草稿标题"

# 将草稿正式发布
npx hexo publish "草稿标题"
```

文章 Front-matter 字段说明（位于 `scaffolds/post.md`）：

```yaml
title: 文章标题
date: 2026-11-27 10:00:00
channel: insights        # 决定归属栏目: insights (行业观察) | technology (技术实践) | thoughts (思考随笔)
categories:
  - 工业数字化
tags:
  - AI Agent
cover: /img/example.jpg  # 封面图路径（图片统一放入 source/img/）
description: "SEO 描述与列表摘要"
keywords: "关键词1, 关键词2"
featured: true           # true 时优先展示在首页 Latest Insights
toc: true                # 是否在文章详情页右侧生成目录
published: true          # 设为 false 可下架隐藏文章
```

### 2. 管理封面图片与媒体资源
- 将图片放入 `source/img/`（或 `source/uploads/`），在 Markdown 或 YAML 中以 `/img/文件名.jpg` 引用。
- **注意**：请勿将原图只放在 `public/` 目录下，`npm run build` 会清空并重新生成 `public/`。

### 3. 管理项目作品集
- **项目列表与首页精选**：编辑 `source/_data/projects.yml`（将 `featured: true` 即可在首页 Featured Projects 展示）。
- **项目独立详情页**：在 `source/projects/<slug>/index.md` 中按「项目背景 → 业务痛点 → 解决方案 → 系统架构 → 核心功能 → 实施成果 → 经验总结」结构编写。

### 4. 管理首页个人品牌、哲学与演讲信息
- 编辑 `source/_data/brand.yml` 即可直接更新首页首屏文案、三大核心领域、个人理念、演讲活动记录及联系邮箱。
- 编辑 `source/_data/profile.yml` 可同步更新 `/resume/` 与 `/about/` 页面的联系方式和能力矩阵。

---

## 三、部署上线

仓库已配置 `.github/workflows/deploy.yml`：
1. 推送代码至 `master` 分支后，GitHub Actions 会自动执行 `npm ci` 与 `npm run build` 并部署到 `adymilk/adymilk.github.io`。
2. 如需配置自定义域名，请在 `source/CNAME` 写入域名，并同步更新 `_config.yml` 中的 `url` 与 `source/robots.txt` 中的 `Sitemap` 地址。
