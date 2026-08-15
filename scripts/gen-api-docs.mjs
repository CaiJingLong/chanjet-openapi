/**
 * 人类友好 API 文档生成器。
 *
 * 从 packages/accounting/src/api/ 源码提取每个模块的接口信息，
 * 生成使用者视角的 markdown 文档供 VitePress 渲染。
 *
 * 提取内容：
 * - 模块名、来源 URL
 * - 每个方法：用途、HTTP method、path、参数表、返回值、错误码、官方链接
 * - 类型定义（可折叠详情）
 *
 * 用法：node scripts/gen-api-docs.mjs
 */
import ts from 'typescript';
const { createProgram } = ts;
import { mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname, resolve, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const API_SRC = join(ROOT, 'packages', 'accounting', 'src', 'api');
const OUT_DIR = join(ROOT, 'docs-tmp', 'accounting');

// ---------------------------------------------------------------------------
// TS Program
// ---------------------------------------------------------------------------

const program = createProgram({
  rootNames: [join(ROOT, 'packages', 'accounting', 'src', 'index.ts')],
  options: {
    target: 99, // ESNext
    module: 99, // ESNext
    moduleResolution: 99, // Bundler
    strict: true,
    skipLibCheck: true,
    noEmit: true,
  },
});
const checker = program.getTypeChecker();

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------

/** 递归查找所有 .ts 文件（排除 index.ts） */
function walkTs(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkTs(full));
    } else if (entry.name.endsWith('.ts') && entry.name !== 'index.ts') {
      results.push(full);
    }
  }
  return results;
}

/** 从文件头注释提取来源 URL */
function extractSourceUrl(source) {
  const match = source.text.match(/来源:\s*(https:\/\/[^\s]+)/);
  return match?.[1];
}

/** 从文件头注释提取模块说明 */
function extractModuleDescription(source) {
  const text = source.text;
  const match = text.match(/\/\*\*[\s\S]*?\*\//);
  if (!match) return undefined;
  const lines = match[0]
    .split('\n')
    .map((l) => l.replace(/^\s*\*\s?/, '').trim())
    .filter(
      (l) =>
        l &&
        l !== '/**' &&
        l !== '*/' &&
        l !== '/' &&
        !l.startsWith('来源') &&
        !l.startsWith('抓取') &&
        !l.startsWith('本地') &&
        !l.startsWith('错误码说明'),
    );
  return lines[0];
}

/** 获取 JSDoc 文本 */
function getJsDocText(node) {
  const jsDocs = node.jsDoc;
  if (jsDocs && jsDocs.length > 0) {
    return jsDocs[0].comment?.toString().trim();
  }
  return undefined;
}

/** 获取 JSDoc 原始文本 */
function getJsDocRawText(node) {
  const jsDocs = node.jsDoc;
  if (!jsDocs || jsDocs.length === 0) return '';
  return jsDocs[0].getText();
}

/** 从 JSDoc 原始文本提取 @param 标签（支持 params.xxx 嵌套） */
function getJsDocParams(node) {
  const params = new Map();
  const raw = getJsDocRawText(node);
  const re = /@param\s+(\S+)\s+(.*?)(?=\s*\*\s*@(?:param|returns|throws|see)|\s*\*\/)/gs;
  for (const m of raw.matchAll(re)) {
    const key = m[1];
    const desc = m[2].replace(/\s+/g, ' ').trim();
    params.set(key, desc);
  }
  return params;
}

/** 从 JSDoc 原始文本提取 @returns */
function getJsDocReturns(node) {
  const raw = getJsDocRawText(node);
  const m = raw.match(/@returns\s+(.*?)(?=\s*\*\s*@(?:param|returns|throws|see)|\s*\*\/)/s);
  return m?.[1]?.replace(/\s+/g, ' ').trim();
}

/** 从 JSDoc 原始文本提取 @see（完整 URL） */
function getJsDocSee(node) {
  const raw = getJsDocRawText(node);
  const m = raw.match(/@see\s+(\S+)/);
  return m?.[1];
}

/** 从 JSDoc 原始文本提取 @throws */
function getJsDocThrows(node) {
  const raw = getJsDocRawText(node);
  const m = raw.match(/@throws\s+(?:\{[^}]+\}\s*)?(.*?)(?=\s*\*\s*@(?:param|returns|throws|see)|\s*\*\/)/s);
  return m?.[1]?.replace(/\s+/g, ' ').trim();
}

/** 从 client.request 调用提取 HTTP method 和 path */
function extractRequestInfo(methodNode) {
  let result = {};

  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.name) &&
      (node.expression.name.text === 'request' || node.expression.name.text === 'requestEnvelope')
    ) {
      const arg = node.arguments[0];
      if (arg && ts.isObjectLiteralExpression(arg)) {
        for (const prop of arg.properties) {
          if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
            if (prop.name.text === 'method' && ts.isStringLiteral(prop.initializer)) {
              result.method = prop.initializer.text;
            }
            if (prop.name.text === 'path' && ts.isStringLiteral(prop.initializer)) {
              result.path = prop.initializer.text;
            }
          }
        }
      }
    }
    node.forEachChild(visit);
  }

  visit(methodNode);
  return result;
}

/** 提取 interface 的属性列表 */
function extractInterfaceFields(iface) {
  const fields = [];
  for (const member of iface.members) {
    if (!ts.isPropertySignature(member)) continue;
    if (!member.name || !ts.isIdentifier(member.name)) continue;
    const name = member.name.text;
    const optional = !!member.questionToken;
    const type = member.type
      ? checker.typeToString(checker.getTypeFromTypeNode(member.type), member, 0x04)
      : 'unknown';
    const doc = getJsDocText(member) ?? '';
    fields.push({ name, type, optional, doc });
  }
  return fields;
}

/** 查找文件中所有 interface 定义 */
function findInterfaces(source) {
  const map = new Map();
  function visit(node) {
    if (ts.isInterfaceDeclaration(node)) {
      map.set(node.name.text, node);
    }
    node.forEachChild(visit);
  }
  visit(source);
  return map;
}

/** 查找文件中的错误码常量 */
function findErrorCodes(source) {
  let result;
  function visit(node) {
    if (ts.isVariableStatement(node)) {
      for (const decl of node.declarationList.declarations) {
        if (decl.name && ts.isIdentifier(decl.name) && decl.name.text.endsWith('_ERROR_CODES')) {
          const name = decl.name.text;
          const entries = [];
          let init = decl.initializer;
          // 处理 `as const` — initializer 是 AsExpression
          if (init && ts.isAsExpression(init)) init = init.expression;
          if (init && ts.isObjectLiteralExpression(init)) {
            for (const prop of init.properties) {
              if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
                const key = prop.name.text;
                if (prop.initializer && ts.isObjectLiteralExpression(prop.initializer)) {
                  let code = '';
                  let message = '';
                  for (const p of prop.initializer.properties) {
                    if (ts.isPropertyAssignment(p) && ts.isIdentifier(p.name)) {
                      if (p.name.text === 'code' && ts.isStringLiteral(p.initializer)) code = p.initializer.text;
                      if (p.name.text === 'message' && ts.isStringLiteral(p.initializer)) message = p.initializer.text;
                    }
                  }
                  entries.push({ key, code, message });
                }
              }
            }
          }
          result = { name, entries };
        }
      }
    }
    node.forEachChild(visit);
  }
  visit(source);
  return result;
}

// ---------------------------------------------------------------------------
// Markdown 生成
// ---------------------------------------------------------------------------
/** 转义非代码块行中的尖括号（VitePress/Vue 安全） */
function escapeAngles(text) {
  const lines = text.split('\n');
  let inCodeBlock = false;
  return lines
    .map((line) => {
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        return line;
      }
      if (inCodeBlock) return line;
      // 转义裸尖括号，但不影响 ::: details `Type` 等容器语法
      return line
        .replace(/<(?=[A-Za-z])/g, '&lt;')
        .replace(/(?<=[A-Za-z0-9_\]])>/g, '&gt;');
    })
    .join('\n');
}

/** 生成 interface 的 markdown 详情（可折叠） */
function interfaceToMarkdown(name, iface) {
  const fields = extractInterfaceFields(iface);
  if (fields.length === 0) return '';

  const lines = [];

  lines.push(`::: details \`${name}\``);
  lines.push('');
  lines.push('| 字段 | 类型 | 可选 | 说明 |');
  lines.push('| --- | --- | --- | --- |');
  for (const f of fields) {
    lines.push(`| \`${f.name}\` | \`${f.type}\` | ${f.optional ? '是' : '否'} | ${f.doc} |`);
  }
  lines.push('');
  lines.push(':::');

  return lines.join('\n');
}

/** 递归收集 interface 引用的子 interface */
function collectReferencedInterfaces(typeStr, allInterfaces, visited) {
  const result = [];
  const matches = typeStr.match(/\b([A-Z][A-Za-z0-9]+)\b/g);
  if (!matches) return result;
  for (const m of matches) {
    if (visited.has(m)) continue;
    const iface = allInterfaces.get(m);
    if (!iface) continue;
    visited.add(m);
    result.push(m);
    const fields = extractInterfaceFields(iface);
    for (const f of fields) {
      result.push(...collectReferencedInterfaces(f.type, allInterfaces, visited));
    }
  }
  return result;
}

/** 生成一个方法的文档 */
function methodToMarkdown(methodName, methodNode, allInterfaces, moduleName, factoryName) {
  const description = getJsDocText(methodNode) ?? '';
  const jsDocParams = getJsDocParams(methodNode);
  const returns = getJsDocReturns(methodNode);
  const see = getJsDocSee(methodNode);
  const throws = getJsDocThrows(methodNode);
  const { method: httpMethod, path: httpPath } = extractRequestInfo(methodNode);

  const lines = [];

  // 标题
  lines.push(`## ${methodName}`);
  lines.push('');

  // HTTP 方法和路径
  if (httpMethod && httpPath) {
    lines.push(`> \`${httpMethod} ${httpPath}\``);
    lines.push('');
  }

  // 描述
  if (description) {
    lines.push(description);
    lines.push('');
  }

  // 参数表
  const paramTags = Array.from(jsDocParams.entries()).filter(([k]) => k.startsWith('params.'));
  if (paramTags.length > 0) {
    lines.push('### 参数');
    lines.push('');
    lines.push('| 参数 | 说明 |');
    lines.push('| --- | --- |');
    for (const [key, desc] of paramTags) {
      const paramName = key.replace(/^params\./, '');
      lines.push(`| \`${paramName}\` | ${desc} |`);
    }
    lines.push('');
  }

  // 返回值
  if (returns) {
    lines.push('### 返回值');
    lines.push('');
    lines.push(returns);
    lines.push('');
  }

  // 类型详情（可折叠）——从方法签名的返回类型提取引用的 interface
  let returnTypeStr = '';
  if (methodNode.type) {
    try {
      const retType = checker.getTypeFromTypeNode(methodNode.type);
      returnTypeStr = checker.typeToString(retType, methodNode, 0x04);
    } catch {}
  }
  // 也从参数类型提取引用
  let paramTypeStr = '';
  if (methodNode.parameters && methodNode.parameters.length > 0) {
    for (const p of methodNode.parameters) {
      if (p.type) {
        try {
          const pType = checker.getTypeFromTypeNode(p.type);
          paramTypeStr += ' ' + checker.typeToString(pType, p, 0x04);
        } catch {}
      }
    }
  }
  const referenced = collectReferencedInterfaces(returnTypeStr + ' ' + paramTypeStr, allInterfaces, new Set());
  if (referenced.length > 0) {
    lines.push('### 类型详情');
    lines.push('');
    for (const ifaceName of referenced) {
      const iface = allInterfaces.get(ifaceName);
      if (iface) {
        lines.push(interfaceToMarkdown(ifaceName, iface));
        lines.push('');
      }
    }
  }

  // 错误
  if (throws) {
    lines.push('### 错误');
    lines.push('');
    lines.push(`抛出 \`ChanjetApiError\`：${throws}`);
    lines.push('');
  }

  // 示例
  lines.push('### 示例');
  lines.push('');
  lines.push('```typescript');
  lines.push(`const ${moduleName}Api = api.${moduleName}.${factoryName}(client);`);
  // 收集必填参数
  const requiredParams = paramTags
    .filter(([k, v]) => k.startsWith('params.') && v.includes('必填'))
    .map(([k]) => k.replace(/^params\./, ''));
  if (requiredParams.length > 0) {
    const args = requiredParams.map((p) => `${p}: '...'`).join(', ');
    lines.push(`const result = await ${moduleName}Api.${methodName}({ ${args} });`);
  } else if (paramTags.length > 0) {
    const firstParam = paramTags[0][0].replace(/^params\./, '');
    lines.push(`const result = await ${moduleName}Api.${methodName}({ ${firstParam}: '...' });`);
  } else {
    lines.push(`const result = await ${moduleName}Api.${methodName}();`);
  }
  lines.push('```');
  lines.push('');

  // 官方文档链接
  if (see) {
    lines.push('### 官方文档');
    lines.push('');
    lines.push(`[查看官方文档](${see})`);
    lines.push('');
  }

  return lines.join('\n');
}

/** 生成一个模块的文档 */
function moduleToMarkdown(filePath, moduleName) {
  const source = program.getSourceFile(filePath);
  if (!source) return '';

  const sourceUrl = extractSourceUrl(source);
  const moduleDesc = extractModuleDescription(source);
  const allInterfaces = findInterfaces(source);
  const errorCodes = findErrorCodes(source);

  // 查找 createXxxApi 工厂函数
  let factoryName = '';
  let factoryNode;
  for (const stmt of source.statements) {
    if (
      ts.isFunctionDeclaration(stmt) &&
      stmt.name &&
      stmt.name.text.startsWith('create') &&
      stmt.name.text.endsWith('Api')
    ) {
      factoryName = stmt.name.text;
      factoryNode = stmt;
      break;
    }
  }

  const lines = [];

  // 模块标题
  lines.push(`# ${moduleName}`);
  lines.push('');

  // 来源
  if (sourceUrl) {
    lines.push(`> 来源：[官方文档](${sourceUrl})`);
    lines.push('');
  }

  // 模块说明
  if (moduleDesc) {
    lines.push(moduleDesc);
    lines.push('');
  }

  // 错误码表
  if (errorCodes && errorCodes.entries.length > 0) {
    lines.push('## 错误码');
    lines.push('');
    lines.push('| 错误码 | 说明 |');
    lines.push('| --- | --- |');
    for (const e of errorCodes.entries) {
      lines.push(`| \`${e.code}\` | ${e.message} |`);
    }
    lines.push('');
  }

  // 提取工厂函数返回的方法
  if (factoryNode && factoryNode.body && ts.isBlock(factoryNode.body)) {
    let returnObject;
    for (const stmt of factoryNode.body.statements) {
      if (ts.isReturnStatement(stmt) && stmt.expression) {
        returnObject = stmt.expression;
        break;
      }
    }

    if (returnObject && ts.isObjectLiteralExpression(returnObject)) {
      for (const prop of returnObject.properties) {
        if (ts.isMethodDeclaration(prop) && prop.name && ts.isIdentifier(prop.name)) {
          const methodDoc = methodToMarkdown(prop.name.text, prop, allInterfaces, moduleName, factoryName);
          lines.push(methodDoc);
          lines.push('---');
          lines.push('');
        }
      }
    }
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  const moduleDirs = readdirSync(API_SRC, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => ({ name: e.name, path: join(API_SRC, e.name) }));

  let totalFiles = 0;

  for (const dir of moduleDirs) {
    const tsFiles = walkTs(dir.path);
    if (tsFiles.length === 0) continue;

    const outModuleDir = join(OUT_DIR, dir.name);
    mkdirSync(outModuleDir, { recursive: true });

    const indexLines = [`# ${dir.name}`, '', '## 接口列表', ''];

    for (const file of tsFiles) {
      const baseName = basename(file, extname(file));
      const md = moduleToMarkdown(file, baseName);

      if (md.trim()) {
        const outFile = join(outModuleDir, `${baseName}.md`);
        writeFileSync(outFile, escapeAngles(md), 'utf-8');
        indexLines.push(`- [${baseName}](${baseName})`);
        totalFiles++;
        console.log(`  ${dir.name}/${baseName}.md`);
      }
    }

    writeFileSync(join(outModuleDir, 'index.md'), indexLines.join('\n'), 'utf-8');
  }

  // 生成 accounting 顶层索引页
  const moduleNames = {
    bb: '报表',
    cwxg: '财务相关',
    hkjMenu: '菜单',
    hkjRoleManager: '角色管理',
    hkjcssz: '财务设置',
    hkjgdzc: '固定资产',
    hkjgz: '工资',
    hkjjz: '结账',
    hkjkchs: '库存核算',
    jcda: '基础档案',
    km: '科目',
    pjgl: '票据管理',
    sz: '收付',
    zb: '账表',
    zjgl: '资金管理',
    zt: '账套',
  };
  const topIndex = [
    '# 好会计 API',
    '',
    '畅捷通好会计开放平台 TypeScript SDK。',
    '',
    '## 模块列表',
    '',
    '| 模块 | 说明 |',
    '| --- | --- |',
    ...moduleDirs
      .filter((d) => walkTs(d.path).length > 0)
      .map((d) => `| [${d.name}](${d.name}/) | ${moduleNames[d.name] ?? ''} |`),
    '',
    '## 快速开始',
    '',
    '```typescript',
    "import { ChanjetClient } from '@chanjet-openapi/core';",
    "import { api } from '@chanjet-openapi/accounting';",
    '',
    'const client = new ChanjetClient({',
    "  appKey: process.env.CHANJET_APP_KEY!,",
    "  appSecret: process.env.CHANJET_APP_SECRET!,",
    "  openToken: process.env.CHANJET_OPEN_TOKEN!,",
    '});',
    '',
    '// 调用 API',
    'const result = await api.bb.createZcfzApi(client).balanceSheet({',
    "  bookid: '...',",
    "  period: '2026-01',",
    '});',
    '```',
  ];
  writeFileSync(join(OUT_DIR, 'index.md'), topIndex.join('\n'), 'utf-8');

  console.log(`\n✅ 生成完成：${totalFiles} 个模块文件`);
}

main();
