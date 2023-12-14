import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  public pageSize: number = 20;
  public currentPage: number = 1;

  public getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  public getEndIndex(totalItems: number): number {
    const endIndex = this.currentPage * this.pageSize;
    return endIndex > totalItems ? totalItems : endIndex;
  }

  public getTotalPages(totalItems: number): number {
    const totalPages = Math.ceil(totalItems / this.pageSize);
    return totalPages;
  }

  public getPages(totalItems: number): number[] {
    const totalPages = this.getTotalPages(totalItems);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  public nextPage(totalItems: number): void {
    const totalPages = this.getTotalPages(totalItems);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  public goToPage(page: number, totalItems: number): void {
    if (page >= 1 && page <= this.getTotalPages(totalItems)) {
      this.currentPage = page;
    }
    this.currentPage = page;
  }

  public changePageSize(size: number, totalItems: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.getTotalPages(totalItems);
  }
}
