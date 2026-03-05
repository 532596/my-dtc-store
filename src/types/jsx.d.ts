/**
 * 兜底：当 @types/react 未被正确加载时，仍能通过 JSX 与 ReactNode 类型检查。
 */
declare namespace React {
  type ReactNode = unknown;
  type Key = string | number;
}

declare namespace JSX {
  interface IntrinsicElements {
    [tag: string]: Record<string, unknown>;
  }
}
