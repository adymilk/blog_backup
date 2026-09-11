# 需要手动完成的事项

## 🔴 P0：释放 /resume/ 路径（阻塞简历页）

**问题**：`adymilk/resume` 仓库的 GitHub Pages 抢占了 `/resume/` 路径。
访问 `https://adymilk.github.io/resume/` 会 301 到 `resume.adymilk.cn`（已 404）。

**为什么 API 做不了**：GitHub 的 `DELETE /repos/{owner}/{repo}/pages` 对该仓库返回
`422 Deactivating GitHub pages for this repository is not allowed.`
（疑似与自定义域名历史有关，属 GitHub 侧限制）

**已经做完的部分**：
- 清除了 API 侧的 `cname` 字段
- 删除了 `gh-pages` 分支里的 `CNAME` 文件（commit `a1b8903`）
- `html_url` 已从 `http://resume.adymilk.cn/` 变回 `https://adymilk.github.io/resume/`

**你需要在网页上操作**：
1. 打开 https://github.com/adymilk/resume/settings/pages
2. 确认 Custom domain 已清空
3. 点 **Unpublish site** / 把 Source 改为 **None**
4. 等待几分钟（GitHub Pages 边缘缓存按路径缓存，需要时间失效）

**验证**：
```bash
curl -sI https://adymilk.github.io/resume/ | grep -iE "^HTTP|^location"
# 期望：无 location 头，且返回码为博客构建的 200
```

**备选方案**（如果 Unpublish 也不行）：
把简历页路径从 `/resume/` 改成 `/cv/`，并在 `_config.yml` 里同步。
