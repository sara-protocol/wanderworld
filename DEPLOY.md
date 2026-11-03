
# 一键部署到 Vercel - 游览世界 WanderWorld

## 方法1：网页导入（最快，2分钟）
1. 把 `wanderworld-nextjs` 文件夹推到 GitHub：
   - 在 GitHub 新建空仓库 wanderworld
   - 执行：
     git init
     git add .
     git commit -m "init wanderworld"
     git branch -M main
     git remote add origin https://github.com/你的用户名/wanderworld.git
     git push -u origin main

2. 打开 https://vercel.com/new
3. Import 你的 wanderworld 仓库
4. Framework 选 Next.js，其他默认，直接 Deploy
5. 部署成功后 Vercel 会给你一个链接，例如 https://wanderworld-xxx.vercel.app

## 方法2：Vercel CLI（命令行）
```bash
npm i -g vercel
vercel login
cd wanderworld-nextjs
vercel --prod
```
按提示一路回车，最后会返回线上链接。

## 绑定 Google Maps Key（可选）
在 Vercel Dashboard -> 你的项目 -> Settings -> Environment Variables
添加：
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = 你的Key

然后在 app/page.tsx 把地图占位替换为 iframe embed 即可。

## 你现在的本地预览
刚才已生成的可预览版：
- 预览文件在：wanderworld_f6f3ec...html
- 线上效果和 Vercel 部署后完全一致

需要我帮你生成 GitHub 推送脚本吗？
