export interface Product {
  id: number;
  name: string;
  description: string;
  cod: number;
  weight: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantity?: number;
  status: boolean;
  date: string;
}
