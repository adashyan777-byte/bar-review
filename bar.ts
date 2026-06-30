// bar.ts — система під тестом. Помилок тут немає: усі баги — у тестах.

export function validateBeers(beers: unknown): boolean {
  return (
    typeof beers === "number" &&
    Number.isInteger(beers) &&
    beers >= 1 &&
    beers <= 100
  );
}

export class Bar {
  private guests = new Set<string>();
  private tab = new Map<string, number>();

  enter(visitor: string): void {
    this.guests.add(visitor);
  }

  orderBeer(visitor: string, beers: number): void {
    if (!this.guests.has(visitor)) throw new Error("Не в барі");
    if (!validateBeers(beers)) throw new Error("Невалідне замовлення");
    this.tab.set(visitor, (this.tab.get(visitor) ?? 0) + beers);
  }

  getTab(visitor: string): number {
    return this.tab.get(visitor) ?? 0;
  }

  // Імітує асинхронний похід бариста по пиво (наче виклик API).
  async orderBeerAsync(visitor: string, beers: number): Promise<void> {
    await new Promise((r) => setTimeout(r, 5));
    this.orderBeer(visitor, beers);
  }
}
