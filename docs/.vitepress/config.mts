import { defineConfig } from 'vitepress';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const ROOT = join(import.meta.dirname, '..');

// 模块中文名映射
const MODULE_NAMES: Record<string, string> = {
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

/** 从 docs/accounting/ 自动构建侧边栏 */
function buildAccountingSidebar() {
  const acctDir = join(ROOT, 'docs', 'accounting');
  const modules: { text: string; link: string }[] = [];

  if (existsSync(acctDir)) {
    for (const entry of readdirSync(acctDir).sort()) {
      const full = join(acctDir, entry);
      if (!statSync(full).isDirectory()) continue;
      const label = MODULE_NAMES[entry] ? `${entry} ${MODULE_NAMES[entry]}` : entry;
      modules.push({ text: label, link: `/accounting/${entry}/` });
    }
  }

  return modules;
}

export default defineConfig({
  title: 'chanjet-openapi',
  description: '畅捷通开放平台 TypeScript SDK',
  base: '/chanjet-openapi/',
  cleanUrls: true,
  ignoreDeadLinks: [/interfaces\/TokenProvider/],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'Core', link: '/core/' },
      { text: 'Accounting', link: '/accounting/' },
      { text: 'AI 参考', link: '/llms' },
    ],

    sidebar: {
      '/core/': [
        {
          text: 'Core',
          items: [
            { text: '概览', link: '/core/' },
            { text: 'ChanjetClient', link: '/core/classes/ChanjetClient' },
            { text: 'ChanjetApiError', link: '/core/classes/ChanjetApiError' },
            { text: 'PLATFORM_ERROR_CODES', link: '/core/variables/PLATFORM_ERROR_CODES' },
            { text: 'isPlatformError', link: '/core/functions/isPlatformError' },
          ],
        },
        {
          text: '接口',
          items: [
            { text: 'ApiEnvelope', link: '/core/interfaces/ApiEnvelope' },
            { text: 'ChanjetClientConfig', link: '/core/interfaces/ChanjetClientConfig' },
            { text: 'RequestOptions', link: '/core/interfaces/RequestOptions' },
            { text: 'TokenProvider', link: '/core/interfaces/TokenProvider' },
            { text: 'ChanjetApiErrorOptions', link: '/core/interfaces/ChanjetApiErrorOptions' },
          ],
        },
        {
          text: '鉴权',
          link: '/core/auth/',
        },
      ],
      '/accounting/': [
        {
          text: 'Accounting',
          items: [{ text: '概览', link: '/accounting/' }],
        },
        {
          text: 'API 模块',
          collapsed: false,
          items: buildAccountingSidebar(),
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CaiJingLong/chanjet-openapi' },
      { icon: 'npm', link: 'https://www.npmjs.com/org/chanjet-openapi' },
    ],

    footer: {
      message: '基于 MIT 协议发布',
    },
  },
});
