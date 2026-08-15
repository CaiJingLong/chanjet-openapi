/**
 * 文档生成脚本。
 *
 * 流程：
 * 1. 对每个包运行 TypeDoc（markdown 插件）生成 API markdown
 * 2. 将 markdown 组织到 docs/ 目录供 VitePress 消费
 * 3. 合并所有 markdown 为单文件 llms.txt（AI 友好）
 * 4. 运行 VitePress 构建生成 HTML
 *
 * 用法：node scripts/gen-docs.mjs
 */
import { execSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PACKAGES = ['core', 'accounting'];
const DOCS_DIR = join(ROOT, 'docs');
const TMP_DIR = join(ROOT, 'docs-tmp');

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------

/** 递归读取目录下所有 .md 文件 */
function walkMd(dir, base = dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walkMd(full, base));
    } else if (entry.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * 对 VitePress 不友好的 markdown 做安全处理：
 * 非代码块行中的尖括号 `<` `>` 转义为 HTML 实体，
 * 避免 Vue 编译器把泛型语法 `<T>`、`<Record<string, unknown>>` 误解析为 HTML 标签。
 * 代码块（``` 包裹）内的内容保持原样。
 */
function escapeAngleBrackets(content) {
  const lines = content.split('\n');
  let inCodeBlock = false;
  return lines
    .map((line) => {
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      if (inCodeBlock) return line;
      // 非代码块：转义裸尖括号（不影响 markdown 链接/HTML 标签）
      // 只转义看起来像泛型的 `<word` 模式，避免破坏合法 HTML 标签
      return line.replace(/<(?=[A-Za-z])/g, '&lt;').replace(/(?<=[A-Za-z0-9_\]])>/g, '&gt;');
    })
    .join('\n');
}

/** 清理 TypeDoc markdown 中的导航噪音，保留内容 */
function cleanMarkdown(content) {
  return (
    content
      // 去掉文件顶部的面包屑导航行
      .replace(/^\[.*?\]\(.*?\)\n+/gm, '')
      // 去掉分隔线
      .replace(/^\*\*\*\n+/gm, '')
      // 去掉 "Defined in: [...]" 源码链接行
      .replace(/^Defined in: \[.*?\]\(.*?\)\n+/gm, '')
      // 去掉多余的空行（连续 3+ → 2）
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

// ---------------------------------------------------------------------------
// 1. TypeDoc 生成 markdown
// ---------------------------------------------------------------------------

function runTypedoc(pkg) {
  const entry = join(ROOT, 'packages', pkg, 'src', 'index.ts');
  const tsconfig = join(ROOT, 'packages', pkg, 'tsconfig.json');
  const out = join(TMP_DIR, pkg);

  console.log(`\n📦 [TypeDoc] 生成 ${pkg} markdown → ${relative(ROOT, out)}`);
  execSync(
    `npx typedoc --plugin typedoc-plugin-markdown ` +
      `--entryPoints "${entry}" ` +
      `--tsconfig "${tsconfig}" ` +
      `--out "${out}" ` +
      `--readme none ` +
      `--githubPages false ` +
      `--cleanOutputDir true ` +
      `--disableSources true ` +
      `--hidePageHeader true ` +
      `--hidePageTitle true ` +
      `--hideBreadcrumbs true ` +
      `--useCodeBlocks true`,
    { cwd: ROOT, stdio: 'inherit' },
  );
  return out;
}

// ---------------------------------------------------------------------------
// 2. 组织到 docs/ 目录
// ---------------------------------------------------------------------------

function organizeDocs() {
  console.log('\n📂 [组织] 复制 markdown 到 docs/');

  // 清空 docs/ 的生成内容（保留 .vitepress/ 和手写页面）
  const PRESERVE = new Set(['.vitepress', 'index.md', 'llms.md']);
  for (const entry of readdirSync(DOCS_DIR)) {
    if (PRESERVE.has(entry)) continue;
    rmSync(join(DOCS_DIR, entry), { recursive: true, force: true });
  }

  for (const pkg of PACKAGES) {
    const src = join(TMP_DIR, pkg);
    const dst = join(DOCS_DIR, pkg);
    if (!existsSync(src)) continue;
    // 复制并对每个 .md 文件做 VitePress 安全处理
    cpSync(src, dst, { recursive: true });
    const mdFiles = walkMd(dst);
    for (const file of mdFiles) {
      const raw = readFileSync(file, 'utf-8');
      writeFileSync(file, escapeAngleBrackets(raw), 'utf-8');
    }
    console.log(`  ${pkg}/ → docs/${pkg}/ (${mdFiles.length} files)`);
  }
}

// ---------------------------------------------------------------------------
// 3. 生成 llms.txt（AI 友好单文件）
// ---------------------------------------------------------------------------

function generateLlmsTxt() {
  console.log('\n🤖 [llms.txt] 合并 markdown 为 AI 友好单文件');

  const sections = [];

  // 头部
  sections.push(`# chanjet-openapi — AI API 参考

> 畅捷通开放平台 TypeScript SDK。本文档供 AI 助手阅读，帮助用户编写代码。
> 源码: https://github.com/CaiJingLong/chanjet-openapi
> npm: https://www.npmjs.com/org/chanjet-openapi

## 安装

\`\`\`bash
pnpm add @chanjet-openapi/core @chanjet-openapi/accounting
# 或
npm install @chanjet-openapi/core @chanjet-openapi/accounting
\`\`\`

## 快速上手

\`\`\`typescript
import { ChanjetClient } from '@chanjet-openapi/core';
import { api } from '@chanjet-openapi/accounting';

const client = new ChanjetClient({
  appKey: process.env.CHANJET_APP_KEY!,
  appSecret: process.env.CHANJET_APP_SECRET!,
  openToken: process.env.CHANJET_OPEN_TOKEN!,
});

// 调用好会计凭证模块
const pzApi = api.cwxg.pz.createPzApi(client);
const result = await pzApi.getInitBalanceList({ bookid: '123', bookId: '123' });
\`\`\`

## 错误处理

所有远端错误归一为 \`ChanjetApiError\`，保留官方 \`code\`/\`msg\` 原文。

\`\`\`typescript
import { ChanjetApiError, isPlatformError, PLATFORM_ERROR_CODES } from '@chanjet-openapi/core';

try {
  const result = await pzApi.getInitBalanceList({ bookid: '123', bookId: '123' });
} catch (e) {
  if (e instanceof ChanjetApiError) {
    console.error('错误码:', e.code);
    console.error('错误消息:', e.msg);
    // 判断是否为平台级错误（token 过期、限流等）
    if (isPlatformError(e, 'INVALID_TOKEN')) {
      // 重新获取 token
    }
  }
}
\`\`\`

## 鉴权

\`\`\`typescript
import { auth } from '@chanjet-openapi/core';

// 方式 1：静态 token
const client = new ChanjetClient({
  appKey: '...',
  appSecret: '...',
  openToken: '静态token',
});

// 方式 2：动态 token provider（自动刷新）
const client2 = new ChanjetClient({
  appKey: '...',
  appSecret: '...',
  tokenProvider: {
    async getOpenToken() {
      // 从缓存/数据库获取最新 token
      return latestToken;
    },
  },
});

// 方式 3：使用 auth 模块获取 token
const tokenResult = await auth.getToken({
  appKey: '...',
  appSecret: '...',
  permanentCode: '永久授权码',
});
\`\`\`
`);

  // 按包合并 API 文档
  for (const pkg of PACKAGES) {
    const pkgDir = join(TMP_DIR, pkg);
    if (!existsSync(pkgDir)) continue;

    const mdFiles = walkMd(pkgDir).sort();
    if (mdFiles.length === 0) continue;

    sections.push(`\n---\n\n# @chanjet-openapi/${pkg}\n`);

    for (const file of mdFiles) {
      const raw = readFileSync(file, 'utf-8');
      const cleaned = cleanMarkdown(raw);
      if (!cleaned) continue;

      // 从文件路径推断层级标题
      const rel = relative(pkgDir, file).replace(/\.md$/, '');
      const parts = rel.split('/');

      if (parts.length === 1) {
        // 顶层文件（README.md）
        sections.push(`\n${cleaned}\n`);
      } else {
        // 嵌套文件，添加路径上下文
        const context = parts.slice(0, -1).join(' / ');
        sections.push(`\n<!-- ${pkg}/${context} -->\n\n${cleaned}\n`);
      }
    }
  }

  const output = sections.join('\n');
  const llmsPath = join(DOCS_DIR, 'llms.txt');
  writeFileSync(llmsPath, output, 'utf-8');
  console.log(`  → docs/llms.txt (${(output.length / 1024).toFixed(1)} KB)`);
}

// ---------------------------------------------------------------------------
// 4. VitePress 构建
// ---------------------------------------------------------------------------

function buildVitePress() {
  console.log('\n🏗️ [VitePress] 构建 HTML 站点');
  execSync('npx vitepress build docs', { cwd: ROOT, stdio: 'inherit' });
  // 将 llms.txt 复制到构建产物（VitePress 不处理 .txt 文件）
  const distDir = join(DOCS_DIR, '.vitepress', 'dist');
  const llmsSrc = join(DOCS_DIR, 'llms.txt');
  if (existsSync(llmsSrc) && existsSync(distDir)) {
    cpSync(llmsSrc, join(distDir, 'llms.txt'));
    console.log('  → llms.txt 已复制到 dist/');
  }
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

function main() {
  console.log('🚀 开始生成文档\n');

  // 清空临时目录
  rmSync(TMP_DIR, { recursive: true, force: true });
  mkdirSync(TMP_DIR, { recursive: true });

  // 1. TypeDoc 生成
  for (const pkg of PACKAGES) {
    runTypedoc(pkg);
  }

  // 2. 组织到 docs/
  organizeDocs();

  // 3. 生成 llms.txt
  generateLlmsTxt();

  // 4. VitePress 构建
  buildVitePress();

  // 清理临时目录
  rmSync(TMP_DIR, { recursive: true, force: true });

  console.log('\n✅ 文档生成完成');
  console.log('   HTML 站点: docs/.vitepress/dist/');
  console.log('   AI 参考:   docs/llms.txt');
}

main();
