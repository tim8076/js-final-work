export function filterProducts(products, filter) {
  if (filter === '全部') return products;
  return products.filter(product => product.category === filter);
}