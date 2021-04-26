import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

export class Page<T> {
  constructor(pao: PaginationAwareObject) {
    this.from = pao.from;
    this.to = pao.to;
    this.perPage = pao.per_page;
    this.total = pao.total;
    this.currentPage = pao.current_page;
    this.prevPage = pao.prev_page || null;
    this.nextPage = pao.next_page || null;
    this.data = pao.data;
  }

  from: any;
  to: any;
  perPage: any;
  total: number | any;
  currentPage: number;
  prevPage?: number | null;
  nextPage?: number | null;
  data: Array<T | any> | any;
}