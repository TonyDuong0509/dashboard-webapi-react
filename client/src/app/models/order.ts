export interface ShippingAddress {
  fullName: string;
  descriptionAddress: string;
}

export interface OrderItem {
  productId: number;
  name: string;
  pictureUrl: string;
  cod: number;
  weight: number;
  quantity: number;
}

export interface Order {
  id: number;
  buyerId: string;
  shippingAddress: ShippingAddress;
  orderDate: string;
  orderItems: OrderItem[];
  totalProducts: number;
}
