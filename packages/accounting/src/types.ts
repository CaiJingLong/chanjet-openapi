/** 通用响应外壳。字段取自官方文档输出参数表与响应示例；官方 code/success 为 string，successful 为 boolean，禁止类型转换。 */
export interface ApiEnvelope<T> {
  code?: string;
  success?: string;
  successful?: boolean;
  msg?: string;
  msgArgs?: { indexedValues?: string[]; namedValues?: Record<string, unknown> };
  data?: T;
  requestId?: string;
  envConfigType?: string;
  verbose?: string;
  multiFieldErrors?: string;
  validateResult?: string;
  nextStepEnumTypeName?: string;
}
