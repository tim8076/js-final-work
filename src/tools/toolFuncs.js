// 過濾產品
export function filterProducts(products, filter) {
  if (filter === '全部') return products;
  return products.filter(product => product.category === filter);
}

// 全品項營收比重
export function calcRevenueProportion(data) {
  const revenueProportion = {};
  data.forEach(order => {
    order.products.forEach(product => {
      if (!revenueProportion[product.title]) {
        revenueProportion[product.title] = product.price * product.quantity;
      } else {
        revenueProportion[product.title] += product.price * product.quantity;
      }
    })
  })
  const top3Products = Object.entries(revenueProportion).sort((a, b) => b[1]- a[1]).slice(0, 3);
  const leftProducts = Object.entries(revenueProportion).sort((a, b) => b[1]- a[1]).slice(3);
  const c3Data = [...top3Products];
  if (leftProducts.length) {
    const leftProductsTotal = leftProducts.reduce((sum, product) => sum + product[1], 0);
    c3Data.push(['其他', leftProductsTotal]);
  }
  return c3Data;
}