# 需要你手动完成的事项

重构已经做完。下面这几件事我无法代劳 —— 要么需要网页操作，
要么需要只有你知道的真实信息。

---

## 🔴 P0 · 释放 `/resume/` 路径（阻塞简历页上线）

**问题**：`adymilk/resume` 仓库的 GitHub Pages 抢占了 `/resume/` 路径。
访问 `https://adymilk.github.io/resume/` 会 301 到 `resume.adymilk.cn`（已 404）。

**为什么我用 API 做不了**：
`DELETE /repos/{owner}/{repo}/pages` 对该仓库返回
`422 Deactivating GitHub pages for this repository is not allowed.`
（疑似与其自定义域名历史有关，属 GitHub 侧限制）

**我已经做完的部分**：
- 清除了 API 侧的 `cname` 字段
- 删除了 `gh-pages` 分支里的 `CNAME` 文件（commit `a1b8903`）
- `html_url` 已从 `http://resume.adymilk.cn/` 变回 `https://adymilk.github.io/resume/`

**你需要在网页上操作**：
1. 打开 https://github.com/adymilk/resume/settings/pages
2. 确认 Custom domain 已清空
3. 点 **Unpublish site**，或把 Source 改成 **None**
4. 等待几分钟 —— GitHub Pages 边缘缓存按路径缓存，需要时间失效

**验证**：
```bash
curl -sI https://adymilk.github.io/resume/ | grep -iE "^HTTP|^location"
# 期望：无 location 头
```

**备选方案**：如果 Unpublish 也不行，把简历页路径从 `/resume/` 改成 `/cv/`，
并在 `_config.yml` 与 `themes/hexo-theme-stun/_config.yml` 的 menu 里同步。

---

## 🔴 P0 · 配置 GitHub Deploy Key（CI 部署需要）

`.github/workflows/deploy.yml` 已经写好，但它需要一个跨仓库的写入凭据。

**为什么不能用 `GITHUB_TOKEN`**：`hexo-deployer-git` 用 SSH 推送到
**另一个仓库**（`adymilk/adymilk.github.io`），而 `GITHUB_TOKEN`
的作用域仅限当前仓库。

**操作步骤**：
```bash
# 1. 本地生成密钥
ssh-keygen -t ed25519 -C "blog-ci" -f /tmp/blog-ci -N ""

# 2. 公钥 → 部署目标仓库（要勾选 Allow write access）
#    https://github.com/adymilk/adymilk.github.io/settings/keys
cat /tmp/blog-ci.pub

# 3. 私钥 → 本仓库的 Secrets，名字必须是 DEPLOY_SSH_KEY
#    https://github.com/adymilk/blog_backup/settings/secrets/actions
cat /tmp/blog-ci

# 4. 删掉本地临时密钥
rm /tmp/blog-ci /tmp/blog-ci.pub
```

---

## 🟠 P1 · 填入真实履历内容

骨架已就位，但**所有真实信息都留空了**。当前站点的状态是：
架构完整、页面可达，但简历页写着「本页正在重构中，目前还不适合投递」。

**要填的三处**（按优先级）：

| 文件 | 填什么 | 残留 TODO 数 |
|---|---|---|
| `source/_data/profile.yml` | 身份、联系方式、求职意向、六维自评、技能关键词、项目 | 21 |
| `source/works/index.md` | 两个 Minitab 案例的决策链 8 项 + L2 可复现证据 | 16 |
| `source/resume/index.md` | 一句话定位、为什么是 FDE、案例、工作经历、教育背景 | 2 |

**随时查看还剩多少没填**：
```bash
npm run check            # 完整报告，退出码 1
npm run check -- --warn  # 只警告
```

**填写时注意三条**：
1. **`about` / `resume` / `profile.yml` 三处必须一致** ——
   重构前它们对学历、城市、公司给出了互相矛盾的版本
2. **量化结果不要编**。量化不了就写「无法量化」并说明原因，比假数字可信
3. **没有真实客户的项目，必须标注「模拟企业场景」**

---

## 🟠 P1 · 补 LLM / GenAI 案例（最大的能力缺口）

`source/works/index.md` 的案例 3 和 `resume` 案例 3 都留空。

FDE 的一手 JD（Anthropic / OpenAI）硬性要求
「LLM / GenAI 生产经验的**可指认证据**」：提示工程、agent、**评测框架**、RAG、MCP。

建议路径（详见 `/works/` 页的注释）：
1. 给已有的 Minitab / SPC 场景接一层 LLM（自然语言 → 分析参数 → 结果解读）
2. 做一个 MCP 服务器，把 Minitab 分析能力暴露成 MCP tool
3. **建评测框架**：20–50 条 golden set + 准确率报告 ← 性价比最高

---

## 🟡 P2 · 安全清理（需要你判断）

| 项 | 说明 |
|---|---|
| Valine appId/appKey | 明文在 `_config.yml`，而 `blog_backup` 是 **PUBLIC** 仓库。appKey 本身客户端可见不算泄密，但建议去 LeanCloud 后台**开启域名白名单** |
| `20210624-1.md` 的密码 | `password: pdm1` 明文**已进 git 历史**。阶段 5 已把它下架（`published: false`），但历史里仍在。如果那篇内容敏感，需要 `git filter-repo` 重写历史 |
| 百度推送 token | 已从 `_config.yml` 移除（明文 token 不该进仓库）。如需恢复请用环境变量 |
| `source/uploads/` | 若要让简历页的「下载 PDF 版」可用，把 PDF 放到这里并填 `profile.yml` 的 `contact.resume_pdf` |

---

## 🟡 P2 · 外链资源转存

`source/works/index.md` 的案例 2 引用了两个 `techmax.com.cn` 上的资源：
- `https://techmax.com.cn/uploadfile/2021/0226/20210226105352646.jpg`
- `https://techmax.com.cn/public/spc.mp4`

**如果那台服务器下线或路径变更，作品页会开天窗。**
建议把图片转存到 `source/uploads/`，视频转存到对象存储或 B 站，然后替换链接。

---

## 🟡 P2 · 可选：自定义域名

当前 `url` 是 `https://adymilk.github.io`。如果你想用 `blog.adymilk.cn`：

好处：URL 更专业（`blog.adymilk.cn/resume/`）、比 `*.github.io` 在国内可达性更好、
换托管商不用改 URL。

⚠️ **注意**：`blog.adymilk.cn` 现在解析到 `207.56.49.45`（一台已无站点的服务器）。
**必须先改 DNS**，否则会和 GitHub Pages 的 A 记录冲突。

做法：
1. DNS 加 4 条 A 记录 → `185.199.108.153` / `.109.153` / `.110.153` / `.111.153`
2. 仓库 Settings → Pages 填自定义域名，勾选 Enforce HTTPS
3. 新建 `source/CNAME`，内容 `blog.adymilk.cn`
4. `_config.yml` 的 `url` 改为 `https://blog.adymilk.cn`
5. 同步 `source/robots.txt` 的 Sitemap 地址

---

## 已完成的部分（供参考）

- 修好了构建链（原来 `npm run build` 必然崩溃在缺失的 gulp 依赖上）
- `url` 从已 404 的 gitee.io 改回 github.io，canonical/sitemap 不再指向死域
- 主题纳入版本控制（原来是 0-commit 的僵尸嵌套仓库，198M → 1.0M）
- 导航重构：「作品与证据」「简历」提到前两位
- 文章分类：消灭「代码笔记」垃圾桶（42/61 篇 → 5 个均衡分类）
- tag：65 → 31 个
- 下架 7 篇（webshell 后门、破解教程、冒名文章、情绪化差评）
- CI：构建部署 / PR 检查两个 workflow，加 `tools/check-todos.js`
