'use strict';
/* global hexo */
/**
 * 部署自检：hexo g -d / hexo d 结束后，核对线上仓库 HEAD 与本地 .deploy_git 是否一致。
 *
 * 背景：hexo-deployer-git 推送失败时，hexo 进程仍可能以 0 退出码结束，
 *       只看屏幕上的 FATAL 很容易漏掉，导致「本地生成了、线上没更新」。
 *       这里在部署结束后主动比对一次，不一致就明确报错。
 */

const { execFileSync } = require('child_process');

const REMOTE = 'git@github-pages-adymilk:adymilk/adymilk.github.io.git';
const BRANCH = 'master';
const TAG = '[deploy-guard]';

hexo.on('deployAfter', () => {
  try {
    const local = execFileSync('git', ['-C', '.deploy_git', 'rev-parse', 'HEAD'], {
      encoding: 'utf8'
    }).trim();

    const raw = execFileSync('git', ['ls-remote', REMOTE, `refs/heads/${BRANCH}`], {
      encoding: 'utf8',
      timeout: 90000
    }).trim();
    const remote = raw.split(/\s+/)[0];

    if (!remote) {
      console.error(`${TAG} 读取线上分支失败，无法确认部署结果`);
      process.exitCode = 1;
      return;
    }

    if (local === remote) {
      console.log(`${TAG} ✓ 线上已更新到 ${local.slice(0, 8)}`);
      console.log(`${TAG}   约 1-2 分钟后生效：https://adymilk.github.io/`);
    } else {
      console.error(`${TAG} ✗ 线上没有更新！本地 ${local.slice(0, 8)} / 线上 ${remote.slice(0, 8)}`);
      console.error(`${TAG}   推送未生效，可直接重试：hexo d`);
      process.exitCode = 1;
    }
  } catch (err) {
    console.error(`${TAG} ✗ 无法确认线上状态：${err.message.split('\n')[0]}`);
    console.error(`${TAG}   请手动检查网络后重试：hexo d`);
    process.exitCode = 1;
  }
});
