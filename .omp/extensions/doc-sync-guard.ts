/**
 * git push 前硬约束：检查 README.md 与实际开发进度是否同步。
 *
 * 拦截 bash 工具中的 git push 命令，block 并要求 agent 先做文档同步检查。
 * agent 检查完同步性后，设置环境变量 DOC_SYNC_VERIFIED=1 再 push 即可放行。
 *
 * 放置位置：.omp/extensions/doc-sync-guard.ts（项目级，Bun 自动加载）
 */
// @ts-nocheck

export default function (pi: any) {
  pi.on('tool_call', async (event: any) => {
    if (event.toolName !== 'bash') return;
    const command = String(event.input?.command ?? '');

    // 只拦截包含 git push 的命令
    if (!/\bgit\s+push\b/.test(command)) return;

    // 已验证则放行（通过环境变量 DOC_SYNC_VERIFIED=1 标记）
    if (process.env.DOC_SYNC_VERIFIED === '1') {
      return; // 放行
    }

    // block 并指示 agent 做语义检查
    return {
      block: true,
      reason: [
        'git push 前必须检查 README.md 与实际开发进度是否同步。',
        '',
        '请执行以下步骤：',
        '1. 读取 README.md，重点看"当前状态"和"包规划"章节',
        '2. 读取 packages/ 目录结构和各包 package.json',
        '3. 读取 AGENTS.md，确认规约与实际工具链一致',
        '4. 逐项比对：',
        '   - 包列表是否完整（packages/ 下的每个包都在 README 中列出）',
        '   - 版本号是否一致（package.json version vs README 标注）',
        '   - 模块数/接口数是否准确',
        '   - "当前状态"描述是否反映实际进度（不能还写"骨架未建"）',
        '   - 工具链约定是否与实际一致（Node 版本、pnpm 版本等）',
        '5. 如有差异，更新 README.md 和 AGENTS.md',
        '6. 确认无差异后，设置环境变量 DOC_SYNC_VERIFIED=1 再重新执行 git push',
        '   例如：DOC_SYNC_VERIFIED=1 git push',
        '',
        '注意：这是硬约束，不可跳过。未检查直接设置标志视为违规。',
      ].join('\n'),
    };
  });
}
