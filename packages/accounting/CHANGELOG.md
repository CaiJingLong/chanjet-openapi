# @chanjet-openapi/accounting

## 0.1.1

### Patch Changes

- [`42584e2`](https://github.com/CaiJingLong/chanjet-openapi/commit/42584e29cdd6fdb1e4d191611a16c6ad76a436fc) Thanks [@CaiJingLong](https://github.com/CaiJingLong)! - 抽取核心能力为独立的 @chanjet-openapi/core 包

  将 client.ts、errors.ts、types.ts、auth/ 从 accounting 包抽取为产品无关的 @chanjet-openapi/core 包。accounting 包通过 workspace 依赖引用 core，re-export 其公共符号保持向后兼容。

- [`46c9c4f`](https://github.com/CaiJingLong/chanjet-openapi/commit/46c9c4f0358d508cbe38e4fb5835c929d0f173fd) Thanks [@CaiJingLong](https://github.com/CaiJingLong)! - 验证 CI 自动发布流程

  首次验证 changesets → GitHub Actions OIDC 自动发布链路是否正常工作。

- Updated dependencies [[`46c9c4f`](https://github.com/CaiJingLong/chanjet-openapi/commit/46c9c4f0358d508cbe38e4fb5835c929d0f173fd)]:
  - @chanjet-openapi/core@0.1.1
