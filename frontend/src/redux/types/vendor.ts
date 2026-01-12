export interface Vendor {
  id: number;
  name: string;
  contact: string;
  department: string;
  location: string;
  created_at: string;
}

export interface PaginationResponse<T> {
  total: number;
  page: number;
  limit: number;
  items: T[];
}

export interface VendorQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  order?: "asc" | "desc";
}
