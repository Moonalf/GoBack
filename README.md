# GoBack · 告白话剧社数字档案

哈尔滨工业大学（深圳）学生艺术团话剧部（告白话剧社）的社团网站。记录历年演出、成员、剧本、社史与社员随笔。

线上地址：<https://moonalf.github.io/GoBack/>

> 内核只有一句话：**所有内容都在 `src/utils/` 的 TS 数据文件里，页面只负责渲染。** 加一场演出、加一篇文章，通常不需要改任何组件。

---

## 1. 技术栈

| 项 | 选型 |
| --- | --- |
| 框架 | Vue 3（`<script setup>` + TypeScript） |
| 构建 | Vite 7 |
| 路由 | Vue Router 4，**hash 模式**（`createWebHashHistory`） |
| 状态 | Pinia（目前基本未用） |
| 样式 | Less + 手写 CSS 变量，**没有 UI 框架** |
| 静态资源 | `public/` 下的 webp 图片，不使用构建期导入 |

## 2. 环境准备

- Node.js ≥ 20（推荐 22，`tsconfig` 基于 `@tsconfig/node22`）
- npm（仓库同时存在 `package-lock.json` 与 `yarn.lock`，统一用 npm）
- 编辑器建议 VS Code + Volar，并关闭 Vetur
- Windows 下注意：PowerShell 5 **不支持 `&&`**，多命令请用 `;` 分隔

```bash
npm install
npm run dev
```

开发服务器默认 `http://localhost:5173/`。

## 3. 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地开发，HMR |
| `npm run build` | 并行执行 `type-check` + `build-only`，产物在 `dist/` |
| `npm run type-check` | `vue-tsc --build`，改完数据文件后建议单独跑一次 |
| `npm run preview` | 预览 `dist/` |
| `npm run lint` | ESLint 自动修复 |
| `npm run format` | Prettier 格式化 `src/` |
| `npm run deploy` | 手动把 `dist/` 推到 `gh-pages`（备用，正常走 Actions） |

代码风格由 `.prettierrc.json` 固定：**无分号、单引号、`printWidth` 100、2 空格缩进**。改动前先格式化，避免提交里混进无关 diff。

## 4. 目录结构

```
src/
├── views/            页面级组件
│   ├── index.vue       首页
│   ├── showus.vue      演出总览
│   ├── showPreview.vue 单场演出详情（弹层式路由）
│   ├── echo.vue        社员随笔列表
│   └── about.vue       关于 / 社史
├── components/       可复用组件（卡片、弹层、导航…）
├── utils/            ★ 所有内容数据
│   ├── showus.ts        演出（最大的文件）
│   ├── echos.ts         随笔索引
│   ├── echos/*.ts       单篇随笔正文
│   ├── histories.ts     社史时间线
│   ├── teachers.ts      指导老师
│   ├── scripts.ts       剧本库
│   └── methods.ts       通用工具函数
├── composables/      useTheme 等组合式函数
├── assets/           base.css（设计 token）、main.css
└── router/           路由表
public/               ★ 所有图片，按用途分目录
```

`public/` 下的图片不会被 Vite 处理，直接按路径访问，因此**文件名一旦被数据引用就不能随意改**。

## 5. 内容维护

### 5.1 演出数据 `src/utils/showus.ts`

顶层是「学年 → 届管理人员 → 演出」的三级数组：

```ts
const showus = [
  {
    managers: [{ name: '南宫灥', avatar: 'members/2015-2016/mayh.webp', word: '' }],
    shows: [
      {
        title: '告白之夜2026·春',
        subtitle: '副标题',
        cover: 'shows/gb2026/cover.webp',      // 列表卡片封面
        introbg: 'shows/gb2026/006.webp',      // 详情页顶部背景
        introduction: ['第一段', '第二段'],     // 每个元素是一段
        producers: [
          { name: '张三', avatar: 'members/2022-2023/zhangs.webp', word: '', character: '制作|导演' },
        ],
        casts: [
          [
            { name: '李四', avatar: '...', word: '一句台词', character: '角色名', side: 'right' },
          ],
        ],
        photos: ['shows/gb2026/table/000.webp'],
        videos: [{ url: 'https://www.bilibili.com/video/BVxxxx/', caption: '节目名' }],
        articles: [{ title: '活动预告 | ...', url: 'https://mp.weixin.qq.com/s/xxx', kind: '预告' }],
      },
    ],
  },
]
```

| 字段 | 说明 |
| --- | --- |
| `title` / `subtitle` | 演出名；`subtitle` 可为空字符串 |
| `cover` / `introbg` | 均存**不带前导 `/` 的相对路径** |
| `introduction` | 字符串数组，一个元素渲染成一段 |
| `producers` | 制作团队，`character` 用 `|` 分隔多个职务（如 `制作|宣发`） |
| `casts` | **二维数组**，外层是「组」（同场不同晚场/不同剧目可分组），内层是演员 |
| `casts[].side` | `'left'` / `'right'`，控制卡片的竖排文字在左还是右 |
| `photos` | 现场回顾图，顺序即展示顺序 |
| `videos` | B 站等外链视频，`caption` 写节目名，会渲染成可点击行 |
| `articles` | 相关推文/报道，`kind` 只能是 `'预告'` 或 `'回顾'`（决定徽章样式） |

`videos` / `articles` 可以为空数组 `[]`，区块会自动隐藏，不会留空白。

### 5.2 随笔 `src/utils/echos/`

每篇文章一个文件，导出对象：

```ts
export default {
  author: '元老',
  avatar: 'members/2024-2025/zhangcx1.webp',
  modified: '2025.05.04',
  title: '标题',
  cover: 'echos/exp.webp',
  tags: ['社团回忆', '经验总结'],
  contents: [
    { type: 'text', text: '正文段落' },
    { type: 'text', text: '高亮段落', style: 'color: yellow; font-weight: bold;' },
    { type: 'image', src: 'echos/drama-dec-8/xxx.webp', text: '图注' },
    { type: 'link', src: 'https://...', text: '原文链接' },
  ],
}
```

- `contents` 区块类型只有 `text` / `image` / `link` 三种。
- `style` 是**内联样式字符串**，只作用于该段的 `text` 块，用于强调。
- 新增文章后必须在 `src/utils/echos.ts` 的数组里 import 并注册，否则列表里看不到。

### 5.3 其他数据

- `histories.ts`：`{ name, date, statement, image }`，社史时间线，按时间顺序排列。
- `teachers.ts`：`{ name, avatar, description }`，指导老师。
- `scripts.ts`：二维数组（按行分组）的剧本条目 `{ name, from, tags, duration, bgImage? }`。

## 6. 样式与页面通用规则

### 尺寸单位：只用 rem

`index.html` 里有段内联脚本按视口宽度动态设置根字号：

```
font-size = min(视口宽, 450) / 375 * 50  px
```

即**设计稿按 375px 宽、1rem = 50 设计像素**，且在 450px 后停止放大。因此：

- 写样式一律用 `rem`：设计稿上 12px → `0.24rem`，24px → `0.48rem`
- 不要写 `px` 做尺寸（1px 的细边框、`border-bottom` 例外）
- 不要用 `@media` 去猜设备宽度，rem 已经自适应

### 深浅色主题

主题由 `<html data-theme="light|dark">` 驱动，token 定义在 [base.css](src/assets/base.css)：

- `:root` 是浅色（默认），`[data-theme='dark']` 是深色
- **组件里只允许用语义 token**（`var(--surface)`、`var(--text-on-surface)`、`var(--brand)` …），不要硬编码 `#fff` / `#000`
- 需要两套主题不同表现时，写覆盖块：`[data-theme='light'] .xxx { ... }`，全部写在 `<style scoped>` 末尾
- 新增颜色必须**同时补两套 token**，否则另一个主题会露馅
- 主题在 `index.html` 的 `<head>` 内联脚本里于 CSS 之前设置，避免闪白；不要把这段逻辑挪到 Vue 里

### 弹层与定位

- 全屏弹层（如 `EchoPreview`、`showPreview`）用 `position: fixed` + `width: 100%`，**不要写死 rem 宽度**，否则窄屏会露空隙
- 祖先元素带 `transform` 时，后代的 `position: fixed` 会退化成相对该祖先定位；遇到「关闭按钮跟着内容滚」这类问题，先查祖先有没有 `transform`

### 链接

- 站外链接一律新标签页打开：`<a :href="url" target="_blank" rel="noopener noreferrer">`
- 不要用 `window.open` 或 `location.href` 跳外链，避免丢失新窗口语义
- 站内跳转走 `vue-router`（hash 模式，形如 `#/showus`）

### 图片路径

数据文件里存 `shows/gb2026/cover.webp` 这种**不带前导斜杠**的路径，组件里统一拼前缀：

```ts
const prefix = import.meta.env.BASE_URL // dev 为 '/'，线上为 '/GoBack/'
```

```
<img :src="prefix + show.cover" />
```

硬编码 `/shows/...` 在线上会 404，因为站点部署在 `/GoBack/` 子路径下。

### 组件写法

- 统一 `<script setup lang="ts">` + `<style lang="less" scoped>`
- 文件名用 PascalCase（`ProducerCard.vue`），视图用 camelCase（`showPreview.vue`）
- 数据用 `ref` / `computed`，不要引入新的全局状态，除非确有必要

## 7. 图片与静态资源规范

### 格式

- **一律 webp**（现有资源统计：1005 张 webp、8 张 png、2 张 ico）
- `.png` 仅用于需要透明通道或系统图标；`.ico` 仅用于 favicon
- 不要提交 gif / jpg / psd / 原图

### 目录与尺寸

| 用途 | 目录 | 基准尺寸 | 比例 |
| --- | --- | --- | --- |
| 首页 banner | `public/banners/` | 1500 × 500 | 3:1 |
| 演出封面 / 剧照 | `public/shows/<简称>/` | 900 × 600 | 3:2 |
| 成员头像 | `public/members/<学年>/` | 300 × 400 | 3:4 |
| 社史长图 | `public/histories/` | 1600 × 900 | 16:9 |
| 文章配图 | `public/echos/<文章>/` | 宽度 ≤ 900 | 不限 |
| 剧本封面 | `public/scripts/` | 与演出封面同 | 3:2 |
| logo / 图标 / 导航图 | `public/common/` | — | — |

### 体积上限

- **单张 ≤ 300KB**，剧照建议控制在 100–200KB
- 仓库现有约 1005 张图、总计 ~29MB，正常单张 0.1–0.2MB；目前有一张 `shows/nhfz/007.webp` 达到 1.14MB，属于需要避免的反例
- 新增一批图后请自查：单张超 300KB 就要压缩，否则首屏会明显变卡

压缩示例（仓库已装 `sharp`）：

```bash
node -e "const s=require('sharp');s('src.jpg').resize({width:900}).webp({quality:80}).toFile('out.webp')"
```

### 命名

- 全部小写，避免空格与中文
- 成员头像用姓名拼音缩写，重名时加后缀区分（`zhuhf.webp`、`zhang-l.webp`）
- 演出剧照用三位序号连续命名：`000.webp`、`001.webp` …
- 演出目录用简短代号：`gb2026`（告白之夜2026）、`nhfz`（你好疯子）、`yqwg`（油漆未干）

## 8. Git 工作流与提交规范

### 分支

| 分支 | 说明 |
| --- | --- |
| `main` | 旧版（Nuxt 时代），**不要往这里提交** |
| `generation11_vue3` | 上一轮线上使用的 Vue 3 分支 |
| `generation12` | 当前开发分支，推送后自动部署 |
| `gh-pages` | GitHub Pages 发布目录，由 Actions 自动写入，勿手改 |

主仓库是 `Moonalf/GoBack`，个人开发通常先推到自己的 fork，再向主仓库提 PR。

### Commit 格式

沿用 Conventional Commits 的中文写法：

```
type(scope): 简述

可选正文：说明为什么改、影响范围
```

| type | 用途 |
| --- | --- |
| `feat` | 新功能、新内容 |
| `fix` | 修 bug、修样式错位 |
| `style` | 仅样式/格式调整，无逻辑变化 |
| `refactor` | 重构，行为不变 |
| `ci` | workflow、部署配置 |
| `docs` | 文档 |
| `chore` | 依赖、杂项 |

示例：

```
feat(shows): 补充各场演出的 B 站视频链接
fix(echo): 修复移动端丢失两篇元老文章
style(showPreview): 浅色主题卡片遮罩改为品牌色渐变
```

要求：

- 一次提交只做一件事，数据改动和样式改动尽量分开
- 描述用中文，动词开头，不加句号
- 提交前跑一遍 `npm run type-check`（改数据的必跑）

### 关于 `dist/`

`dist/` 在历史上被提交过（目前仍被 Git 跟踪，`.gitignore` 里的 `dist` 对已跟踪文件无效）。**构建产生的新产物不要提交**，提交前还原：

```bash
git checkout -- dist/
```

## 9. 部署

自动部署由 [.github/workflows/deploy.yaml](.github/workflows/deploy.yaml) 完成：

1. 推送到 `generation12`（或手动 `workflow_dispatch`）触发
2. `npm install` → `npm run build`
3. 用 `peaceiris/actions-gh-pages@v4` 把 `dist/` 推到 `gh-pages` 分支
4. Pages 从 `gh-pages` 根目录发布

仓库需要满足两个设置：

- Settings → Actions → General → Workflow permissions 选 **Read and write permissions**
- Settings → Pages → Source 选 **Deploy from a branch**，分支 `gh-pages`，目录 `/ (root)`

构建 `base` 在 [vite.config.ts](vite.config.ts) 中判定：

- 默认生产构建为 `/GoBack/`（对应 `*.github.io/GoBack/`）
- 环境变量 `NETLIFY=true` 或 `EDGEONE=true` 时改为 `/`

`npm run deploy`（`gh-pages -d dist`）只作为本地手动兜底，正常不需要用。

## 10. 常见坑

| 现象 | 原因与处理 |
| --- | --- |
| 图片线上 404、本地正常 | 硬编码了 `/xxx.webp`，改用 `import.meta.env.BASE_URL` 前缀 |
| 首屏闪白 / 主题闪烁 | 主题脚本被挪出 `<head>`，或 CSS 换了加载顺序 |
| 弹层两侧有空隙 | 固定宽度写死，改成 `width: 100%` |
| 关闭按钮跟着内容滚动 | 祖先有 `transform`，fixed 退化为绝对定位 |
| 窄屏文字过大、桌面端过宽 | 用了 px 而非 rem；rem 已在 450px 处封顶 |
| 深色主题下某个元素「没适配」 | 组件里硬编码了颜色，改用 token 或加 `[data-theme='dark']` 覆盖 |
| 新增文章列表里看不到 | 忘记在 `src/utils/echos.ts` 注册 |
| 提交里混进一大堆 `dist/` | 构建后未执行 `git checkout -- dist/` |

## 11. 内容更新速查

**加一场新演出**

1. 建目录 `public/shows/<简称>/`，放封面 `cover.webp`(900×600)、顶部背景、剧照
2. 在 `src/utils/showus.ts` 对应学年的 `shows` 数组里追加对象，填 `title` / `cover` / `introbg` / `introduction` / `producers` / `casts` / `photos`
3. 有录像填 `videos`，有公众号推文或报道填 `articles`
4. `npm run type-check` → 本地看效果 → 提交

**加一篇文章**

1. 新建 `src/utils/echos/<英文短横线名>.ts`
2. 在 `src/utils/echos.ts` 里 import 并加进数组
3. 配图放 `public/echos/<同文章名>/`

**换主题色 / 调字号**

只改 `src/assets/base.css` 的 token，和 `index.html` 的 rem 计算参数，不要在组件里改。
