import { Input, OnInit } from "@angular/core";
import { ProgramModel } from "../models/program.model";
import { PaginationService } from "../services/pagination.service";
import { ProgramsPageViewModel } from "./programs-page.viewmodel";

export class PaginationViewModel {

    public currentPageSize: number = 20;
    public currentPage: number = 1;
    public pageCountToShow: number = 5;
    public pagesCount!: number;

    constructor(
      private _paginationService: PaginationService,
      private _programsPageViewModel: ProgramsPageViewModel
    ) {
      this.pagesCount = this._paginationService.getTotalPages(this._programsPageViewModel.programs.length);
      this._programsPageViewModel.displayedPrograms = this.getDisplayedPrograms();
    }

    public calculateLastRecordIndex(): number {
      const lastIndex = this.currentPageSize * this.currentPage;
      return Math.min(lastIndex, this._programsPageViewModel.programs.length);
    }

    public getDisplayedPrograms(): ProgramModel[] {
      const startIndex = this._paginationService.getStartIndex();
      const endIndex = this._paginationService.getEndIndex(this._programsPageViewModel.programs.length);
      return this._programsPageViewModel.programs.slice(startIndex - 1, endIndex);
    }

    public getPageNumbers(): number[] {
      const pageCountToShow = this.pageCountToShow;
      const currentPage = this.currentPage;
      const pagesCount = this.pagesCount;
      let startPage = Math.max(1, currentPage - Math.floor(pageCountToShow / 2));
      let endPage = Math.min(pagesCount, startPage + pageCountToShow - 1);

      if (endPage - startPage + 1 < pageCountToShow) {
        startPage = Math.max(1, endPage - pageCountToShow + 1);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
    }

    public prevPage(): void {
      this._paginationService.prevPage();
    }

    public nextPage(): void {
      this._paginationService.nextPage(this._programsPageViewModel.programs.length);
    }

    public goToPage(page: number): void {
      this._paginationService.goToPage(page, this._programsPageViewModel.programs.length);
      this.currentPage = page;
      this._paginationService.currentPage = page;
      this._programsPageViewModel.displayedPrograms = this.getDisplayedPrograms();
    }

    public changePageSize(size: number): void {
      this.currentPageSize = size;
      this._paginationService.changePageSize(size, this._programsPageViewModel.programs.length);
      this.pagesCount = this._paginationService.getTotalPages(this._programsPageViewModel.programs.length);
      this.goToPage(1);
    }
}
