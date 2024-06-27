import { DealProduct, ProductAmazon, ProductData } from "./interfaces"

export const DealAdapter = (deal: DealProduct): ProductData => ({
    id: deal.product_asin,
    category: '',
    name: deal.deal_title,
    price: '',
    badge: deal.deal_badge,
    stock: 0,
    description: '',
    imgUrl: deal.deal_photo,
    priceBeforeDiscount: 0,
    rating: 5
});

export const AmazonProductAdapter = (product: ProductAmazon): ProductData => ({
    id: product.asin,
    category: product.category_path.map(el => el.name).join(', '),
    name: product.product_title,
    price: product.product_price,
    stock: 0,
    description: product.product_description,
    imgUrl: product.product_photo,
    priceBeforeDiscount: 0,
    rating: Number(product.product_star_rating)
});