import { PRODUCTS } from '../../catalog/products';
import type { TonnerLineKey } from '../../catalog/tonnerLines';
import type { Product } from '../../catalog/types';
import type { ClientGoalKey } from './clientGoals';
import type { ClientRecommendationRule } from './recommendationRules';

export function findProductsByIds(productIds: string[], line: TonnerLineKey): Product[] {
  const selected: Product[] = [];

  for (const id of productIds) {
    const product = PRODUCTS.find(
      (item) =>
        item &&
        item.id === id &&
        item.line === line &&
        !selected.some((entry) => entry.id === item.id),
    );

    if (product) {
      selected.push(product);
    }
  }

  if (selected.length < 3) {
    for (const product of PRODUCTS) {
      if (!product || product.line !== line || selected.some((entry) => entry.id === product.id)) {
        continue;
      }

      selected.push(product);

      if (selected.length === 3) {
        break;
      }
    }
  }

  return selected.slice(0, 3);
}

export function getRecommendedProducts({
  intent,
  suboption,
  goal,
  line,
  rules,
}: {
  intent: string;
  suboption: string;
  goal: ClientGoalKey;
  line: TonnerLineKey;
  rules: ClientRecommendationRule[];
}): Product[] {
  const rule = rules.find((item) => item.intent === intent && item.suboption === suboption);

  if (!rule) {
    return findProductsByIds([], line);
  }

  const ids = rule.goals[goal] ?? rule.fallback;

  return findProductsByIds(ids, line);
}
