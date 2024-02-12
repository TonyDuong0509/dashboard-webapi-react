export interface Customer {
  id: number;
  fullName: string;
  phoneNumber: string;
  address: string;
  description?: string;
}

export interface CustomerParams {
  searchTerm?: string;
  pageNumber: number;
  pageSize: number;
}
