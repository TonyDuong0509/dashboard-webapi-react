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
  date: string;
  isWeighed: boolean;
}
export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  types: string[];
  brands: string[];
  pageNumber: number;
  pageSize: number;
}
