type TokenNode = {
  $value?: string;
  [key: string]: unknown;
};

export type TokenTree = Record<string, TokenNode | Record<string, unknown>>;

function isToken(value: unknown): value is TokenNode {
  return Boolean(value && typeof value === "object" && "$value" in value);
}

function flattenTokens(tree: TokenTree, prefix: string[] = [], out: Record<string, string> = {}) {
  Object.entries(tree).forEach(([key, value]) => {
    if (isToken(value)) {
      out[[...prefix, key].join(".")] = String(value.$value);
      return;
    }

    if (value && typeof value === "object") {
      flattenTokens(value as TokenTree, [...prefix, key], out);
    }
  });

  return out;
}

export function resolveTokens(...trees: TokenTree[]) {
  const flattened = trees.reduce<Record<string, string>>(
    (acc, tree) => Object.assign(acc, flattenTokens(tree)),
    {}
  );

  const resolveValue = (value: string, depth = 0): string => {
    if (depth > 8) return value;
    return value.replace(/\{([^}]+)\}/g, (_, path: string) => {
      const next = flattened[path];
      return next ? resolveValue(next, depth + 1) : `{${path}}`;
    });
  };

  return Object.fromEntries(Object.entries(flattened).map(([key, value]) => [key, resolveValue(value)]));
}

export function tokenPathToCssVar(path: string) {
  return `--${path.replace(/\./g, "-")}`;
}
