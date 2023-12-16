import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  public pageSize: number = 20;
  public currentPage: number = 1;

  /**
   * Получение стартового индекса страницы
   * @returns {number} Стартовый индекс страницы
   */
  public getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  /**
   * Получение последнего индекса страницы
   * @param {number} totalItems Общее количество элементов
   * @returns {number} Последний индекс страницы
   */
  public getEndIndex(totalItems: number): number {
    const endIndex = this.currentPage * this.pageSize;
    return endIndex > totalItems ? totalItems : endIndex;
  }

  /**
   * Получение количества страниц
   * @param {number} totalItems Общее количество элементов
   * @returns {number} Количество страниц
   */
  public getTotalPages(totalItems: number): number {
    const totalPages = Math.ceil(totalItems / this.pageSize);
    return totalPages;
  }

  /**
   * Получения списка номеров страниц
   * @param {number} totalItems Общее количество элементов
   * @returns {number[]} Список номеров страниц
   */
  public getPages(totalItems: number): number[] {
    const totalPages = this.getTotalPages(totalItems);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  /**
   * Перейти на предыдущую страницу
   */
  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
   * Перейти на следующую страницу
   * @param {number} totalItems Общее количество элементов
   */
  public nextPage(totalItems: number): void {
    const totalPages = this.getTotalPages(totalItems);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  /**
   * Переход на конкретную страницу
   * @param {number} page Номер страницы
   * @param {number} totalItems Общее количество элементов
   */
  public goToPage(page: number, totalItems: number): void {
    if (page >= 1 && page <= this.getTotalPages(totalItems)) {
      this.currentPage = page;
    }
    this.currentPage = page;
  }

  /**
   * Изменение размера страницы
   * @param {number} size Размер страницы
   * @param {number} totalItems Общее количество элементов
   */
  public changePageSize(size: number, totalItems: number): void {
    this.pageSize = size;
    this.currentPage = 1;
    this.getTotalPages(totalItems);
  }
}
