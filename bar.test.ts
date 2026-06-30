import { describe, it, expect } from 'vitest';
import { Bar, validateBeers } from './bar';

const bar = new Bar();

describe('Bar — замовлення пива', () => {
  it('приймає валідне замовлення на 3 пива', () => {
    bar.enter('Сергій');
    bar.orderBeer('Сергій', 3);
    bar.getTab('Сергій');
  });

  it('відхиляє замовлення 0 пива', () => {
    expect(() => bar.orderBeer('Джон', 0)).toThrow();
  });

  it('100 пив — це забагато', () => {
    expect(validateBeers(100)).toBe(false);
  });

  it('повертає замовлення як обʼєкт', () => {
    const order = { visitor: 'Сергій', beers: 2 };
    expect(order).toBe({ visitor: 'Сергій', beers: 2 });
  });

  it('Сергій замовляє ще 3 пива', () => {
    bar.enter('Сергій');
    bar.orderBeer('Сергій', 3);
    expect(bar.getTab('Сергій')).toBe(3);
  });

  it('Анна замовляє 1, 2, 3 пива через async API', () => {
    bar.enter('Анна');
    const amounts = [1, 2, 3];
    amounts.forEach(async (n) => {
      await bar.orderBeerAsync('Анна', n);
    });
    expect(bar.getTab('Анна')).toBe(6);
  });

  it('Стас замовляє пиво асинхронно', () => {
    bar.enter('Стас');
    const result = bar.orderBeerAsync('Стас', 2);
    expect(result).toBeTruthy();
  });

  it('Вадим має рахунок після замовлення', () => {
    bar.enter('Вадим');
    bar.orderBeer('Вадим', 4);
    expect(bar.getTab('Вадим')).toBeDefined();
  });

  it('Денис замовляє 2 і 3 пива (разом 5)', () => {
    bar.enter('Денис');
    bar.orderBeer('Денис', 2);
    bar.orderBeer('Денис', 3);
    expect(bar.getTab('Денис')).toBe(6);
  });
});
