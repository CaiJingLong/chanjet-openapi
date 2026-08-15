/**
 * 来源: https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/zdybb
 * 抓取日期: 2026-08-14
 * 本地快照: .cache/docs/accounting/bb/zdybb.md
 */

import type { ChanjetClient } from '@chanjet-openapi/core';

/**
 * 官方文档（zdybb）未提供「错误码说明」表，故本模块不定义错误码常量。
 */

/** 自定义报表接口 - 请求参数。 */
export interface QueryParams {
  /** 账套id，必填 */
  bookid: string;
  /** 报表Id，从《获取报表定义》接口中获取，必填 */
  customizedDetailId: string;
  /** 期间，必填 */
  period: string;
}

/**
 * 自定义报表数据（GrapeCity SpreadJS 工作簿序列化结构）。
 * 官方未提供输出参数表，字段依据响应示例推导，均标记为可选。
 * 该类型对应响应 `data` 载荷（`client.request` 已解包通用响应外壳）。
 */
export interface QueryResult {
  /** 工作表集合，key 为工作表名称 */
  sheets?: Record<string, QueryResultSheet>;
  /** 命名样式数组 */
  namedStyles?: QueryResultNamedStyle[];
  /** 是否显示工作表标签栏（1 显示 / 0 隐藏） */
  tabStripVisible?: number;
  /** 当前活动工作表索引 */
  activeSheetIndex?: number;
  /** 标签栏宽度比例 */
  tabStripRatio?: number;
  /** 是否显示新增工作表标签 */
  newTabVisible?: number;
  /** 工作表数量 */
  sheetCount?: number;
  /** 工作表标签是否可编辑 */
  tabEditable?: number;
}

/** 工作表。 */
export interface QueryResultSheet {
  /** 工作表名称 */
  name?: string;
  /** 行数 */
  rowCount?: number;
  /** 列数 */
  columnCount?: number;
  /** 单元格数据 */
  data?: QueryResultSheetData;
  /** 列信息 */
  columns?: QueryResultSheetColumn[];
  /** 行信息 */
  rows?: QueryResultSheetRow[];
  /** 合并单元格区域 */
  spans?: QueryResultRange[];
  /** 选中区域 */
  selections?: QueryResultSelections;
  /** 列头数据 */
  colHeaderData?: QueryResultHeaderData;
  /** 行头数据 */
  rowHeaderData?: QueryResultHeaderData;
  /** 默认值 */
  defaults?: QueryResultSheetDefaults;
  /** 打印设置 */
  printInfo?: QueryResultPrintInfo;
}

/** 工作表单元格数据。 */
export interface QueryResultSheetData {
  /**
   * 数据表，外层 key 为行索引（字符串），内层 key 为列索引（字符串），值为单元格。
   */
  dataTable?: Record<string, Record<string, QueryResultCell>>;
  /** 列数据数组 */
  columnDataArray?: QueryResultColumnData[];
  /** 默认单元格节点 */
  defaultDataNode?: QueryResultDataNode;
}

/** 单元格。官方示例中 `col`/`row` 为字符串、`level` 为数字、`value` 为字符串。 */
export interface QueryResultCell {
  /** 样式名（引用 namedStyles 中的 name） */
  style?: string;
  /** 单元格值 */
  value?: string;
  /** 列索引（字符串） */
  col?: string;
  /** 行索引（字符串） */
  row?: string;
  /** 是否可见 */
  visible?: boolean;
  /** 公式 */
  fml?: string;
  /** 层级 */
  level?: number;
  /** 是否可编辑（'0'/'1'） */
  editable?: string;
  /** 是否可编辑值 */
  canEditValue?: boolean;
  /** 重置值 */
  resetValue?: string;
  /** 重置表达式描述 */
  resetExpressionDes?: string;
  /** 表达式描述 */
  expressionDes?: string;
  /** 是否已修订（'0'） */
  revised?: string;
  /** 是否已设置层级 */
  hasSetLevel?: boolean;
  /** 字段标识 */
  fld?: string;
}

/** 列数据数组元素。 */
export interface QueryResultColumnData {
  /** 样式名 */
  style?: string;
}

/** 列信息元素。 */
export interface QueryResultSheetColumn {
  /** 列宽 */
  size?: number;
}

/** 行信息元素。 */
export interface QueryResultSheetRow {
  /** 行高 */
  size?: number;
}

/** 单元格区域（合并单元格/选中区域）。 */
export interface QueryResultRange {
  /** 起始列 */
  col?: number;
  /** 列跨度 */
  colCount?: number;
  /** 起始行 */
  row?: number;
  /** 行跨度 */
  rowCount?: number;
}

/** 选中区域集合，数字 key 为选区索引，`length` 为选区数量。 */
export interface QueryResultSelections {
  length?: number;
  [index: string]: QueryResultRange | number | undefined;
}

/** 列头/行头数据。 */
export interface QueryResultHeaderData {
  defaultDataNode?: QueryResultDataNode;
}

/** 默认节点。 */
export interface QueryResultDataNode {
  style?: QueryResultStyle;
}

/** 内联样式对象。 */
export interface QueryResultStyle {
  /** 主题字体 */
  themeFont?: string;
  /** 是否自动换行 */
  wordWrap?: number;
  /** 是否锁定 */
  locked?: number;
  /** 文本缩进 */
  textIndent?: number;
  /** 垂直对齐 */
  vAlign?: number;
  /** 前景色 */
  foreColor?: string;
  /** 字体描述 */
  font?: string;
}

/** 命名样式。 */
export interface QueryResultNamedStyle {
  /** 样式名 */
  name?: string;
  /** 父样式名 */
  parentName?: string;
  /** 主题字体 */
  themeFont?: string;
  /** 字体描述 */
  font?: string;
  /** 前景色 */
  foreColor?: string;
  /** 背景色 */
  backColor?: string;
  /** 格式 */
  formatter?: string;
  /** 是否锁定 */
  locked?: number;
  /** 文本缩进 */
  textIndent?: number;
  /** 垂直对齐 */
  vAlign?: number;
  /** 水平对齐 */
  hAlign?: number;
  /** 是否自动换行 */
  wordWrap?: number;
  /** 上边框 */
  borderTop?: QueryResultBorder;
  /** 下边框 */
  borderBottom?: QueryResultBorder;
  /** 左边框 */
  borderLeft?: QueryResultBorder;
  /** 右边框 */
  borderRight?: QueryResultBorder;
}

/** 边框。 */
export interface QueryResultBorder {
  /** 边框颜色 */
  color?: string;
  /** 边框线型 */
  style?: number;
}

/** 工作表默认值。 */
export interface QueryResultSheetDefaults {
  /** 列头行高 */
  colHeaderRowHeight?: number;
  /** 列宽 */
  colWidth?: number;
  /** 行头列宽 */
  rowHeaderColWidth?: number;
  /** 行高 */
  rowHeight?: number;
}

/** 打印设置。 */
export interface QueryResultPrintInfo {
  /** 页边距 */
  margin?: QueryResultPrintInfoMargin;
  /** 页码顺序 */
  pageOrder?: number;
  /** 纸张大小 */
  paperSize?: QueryResultPrintInfoPaperSize;
}

/** 页边距。 */
export interface QueryResultPrintInfoMargin {
  bottom?: number;
  footer?: number;
  header?: number;
  left?: number;
  right?: number;
  top?: number;
}

/** 纸张大小。 */
export interface QueryResultPrintInfoPaperSize {
  height?: number;
  kind?: number;
  width?: number;
}

/** 自定义报表模块工厂。 */
export function createZdybbApi(client: ChanjetClient) {
  return {
    /**
     * 获取自定义报表数据。
     *
     * @param params 查询条件
     * @param params.bookid 账套id，必填
     * @param params.customizedDetailId 报表Id，从《获取报表定义》接口中获取，必填
     * @param params.period 期间，必填
     * @returns SpreadJS 工作簿序列化结构的报表数据，`sheets` 为工作表集合
     * @throws {ChanjetApiError} 远端返回业务错误、网络异常或签名失败
     * @see https://open.chanjet.com/md/docs/file/apiFile/accounting/bb/zdybb
     */
    query(params: QueryParams): Promise<QueryResult> {
      const { bookid, ...query } = params;
      return client.request<QueryResult>({
        method: 'GET',
        path: '/accounting/fin/query/{bookid}',
        pathParams: { bookid },
        query,
      });
    },
  };
}
