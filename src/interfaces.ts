export interface IProduct {
    id: number
    name: string
    description: string
    price: number
    on_sale: boolean
    images: IImages
    stock_status: string
    stock_quantity: number
    tags: ITag[]
    quantity: number
  }
  
export interface IImages {
    thumbnail: string
    large: string
}
  
export interface ITag {
    id: number
    name: string
    slug: string
  }

export interface ICartItem {
  name: string,
  product_id: number,
  price: number,
  quantity: number,
  thumbnail: string
}

export interface ContactInfo {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_phone: string;
  customer_email: string;
  order_items: Product[];
  order_total: number;
}

export interface Product {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
}

export interface orderResponse {
  status: string;
  message: string;
  data: {
    id: number;
    user_id: number;
    customer_order_date: string;
    customer_first_name: string;
    customer_last_name: string;
    customer_address: string;
    customer_postcode: string;
    customer_city: string;
    customer_email: string;
    customer_phone: string;
    order_total: number;
    created_at: string;
    updated_at: string;
    items: {
      id: number;
      order_id: number;
      product_id: number;
      qty: number;
      item_price: number;
      item_total: number;
    }[];
  };
}