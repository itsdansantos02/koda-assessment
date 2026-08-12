import { ILinks } from './Links';
import { IPagination } from './Pagination';

export interface ListResponse<T> {
  links: any;
  data: T[];
  meta: IPagination;
  message?: string;
}

export interface OneResponse<T> {
  data: T;
  message?: string;
}
