import { TransformedProduct, WooCommerceProduct } from '../interfaces/products.interface';

export function transformProducts(products: WooCommerceProduct[]): TransformedProduct[] {
  return products.map((product) => transformProduct(product));
}

export function transformProduct(product: WooCommerceProduct): TransformedProduct {
  return {
    productId: product.id,
    productName: product.name,
    productSlug: product.slug,
    productUrl: product.permalink,
    createdDate: product.date_created,
    modifiedDate: product.date_modified,
    productType: product.type,
    productStatus: product.status,
    isFeatured: product.featured,
    visibility: product.catalog_visibility,
    productDescription: product.description,
    shortDescription: product.short_description,
    sku: product.sku,
    price: parseFloat(product.price),
    regularPrice: parseFloat(product.regular_price),
    salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
    isOnSale: product.on_sale,
    isPurchasable: product.purchasable,
    totalSales: product.total_sales,
    isVirtual: product.virtual,
    stockStatus: product.stock_status,
    stockQuantity: product.stock_quantity,
    weight: product.weight,
    dimensions: {
      length: product.dimensions.length,
      width: product.dimensions.width,
      height: product.dimensions.height,
    },
    categories: product.categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
    })),
    images: product.images.map((image) => ({
      id: image.id,
      url: image.src,
      name: image.name,
    })),
  };
}
