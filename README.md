# 满月宴邀请函

这是一个可直接部署到 `GitHub Pages` 的静态邀请函页面。

## 本地预览

直接双击打开 `index.html` 即可。

## 部署到 GitHub Pages

1. 新建一个 GitHub 仓库，比如 `invite`.
2. 把当前目录文件推送到仓库默认分支。
3. 打开 GitHub 仓库页面，进入 `Settings` -> `Pages`。
4. 在 `Build and deployment` 里选择：
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
5. 保存后等待几十秒，GitHub 会生成站点地址。

## 自定义内容

- 时间地点：编辑 `index.html`
- 视觉样式：编辑 `styles.css`
- 电话回执：修改 `index.html` 里的 `tel:13800138000`
- 地图链接：修改 `index.html` 里的 `查看路线` 链接

## 自定义域名

如果后面要绑域名，可以在 `Settings` -> `Pages` 里直接配置。

## 微信分享与浏览器兼容

- 当前版本已经补齐基础分享信息，普通链接分享时会更容易显示正确标题、描述和封面。
- 页面不再依赖 Google Fonts，兼容微信内置浏览器、Safari、Chrome、Edge 会更稳。
- 路线链接改成了更通用的高德搜索链接，国内手机浏览器打开更合适。
- 如果你后面要做“在微信里固定自定义分享标题、描述、缩略图”，通常还需要接入微信 `JS-SDK`，并使用可校验的正式域名。
- 当前已增加 `404.html`，对 GitHub Pages 的直接访问和异常路径回落更友好。
