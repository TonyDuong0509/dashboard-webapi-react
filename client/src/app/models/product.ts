export interface Product {
  id: number;
  name: string;
  description: string;
  cod: number;
  weight: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantity: number;
  isGone: string;
  date: string;
}
export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  types: string[];
  brands: string[];
  isGone: string[];
  pageNumber: number;
  pageSize: number;
}
