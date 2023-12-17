import { ProgramModel } from '../models/program.model';
import { PaginationService } from '../services/pagination.service';
import { ProgramsPageViewModel } from './programs-page.viewmodel';

export class PaginationViewModel {

    public currentPageSize: number = 20;
    public pageCountToShow: number = 5;
    public pagesCount!: number;

    constructor(
      private _paginationService: PaginationService,
      private _programsPageViewModel: ProgramsPageViewModel
    ) {
        this.pagesCount = this._paginationService.getTotalPages(this._programsPageViewModel.filteredPrograms.length);
        this._programsPageViewModel.displayedPrograms = this.getDisplayedPrograms();
    }

    public calculateLastRecordIndex(): number {
        const lastIndex = this.currentPageSize * this._paginationService.currentPage;

        return Math.min(lastIndex, this._programsPageViewModel.filteredPrograms.length);
    }

    /**
     * Получить отображаемые на странице элементы
     * @returns {ProgramModel[]} Список отображаемых на странице элементов
     */
    public getDisplayedPrograms(): ProgramModel[] {
        const startIndex = this._paginationService.getStartIndex();
        const endIndex = this._paginationService.getEndIndex(this._programsPageViewModel.filteredPrograms.length);

        return this._programsPageViewModel.filteredPrograms.slice(startIndex - 1, endIndex);
    }

    public getPageNumbers(): number[] {
        const pageCountToShow = this.pageCountToShow;
        const pagesCount = this.pagesCount;
        this.pagesCount = this._paginationService.getTotalPages(this._programsPageViewModel.filteredPrograms.length);
        let startPage = Math.max(1, this._paginationService.currentPage - Math.floor(pageCountToShow / 2));
        const endPage = Math.min(pagesCount, startPage + pageCountToShow - 1);

        if (endPage - startPage + 1 < pageCountToShow) {
            startPage = Math.max(1, endPage - pageCountToShow + 1);
        }

        return Array.from({ length: endPage - startPage + 1 }, (j, i) => i + startPage);
    }

    public prevPage(): void {
        this._paginationService.prevPage();
    }

    public nextPage(): void {
        this._paginationService.nextPage(this._programsPageViewModel.filteredPrograms.length);
    }

    public goToPage(page: number): void {
        this._paginationService.goToPage(page, this._programsPageViewModel.filteredPrograms.length);
        this._paginationService.currentPage = page;
        this._paginationService.currentPage = page;
        this._programsPageViewModel.displayedPrograms = this.getDisplayedPrograms();
    }

    public changePageSize(size: number): void {
        this.currentPageSize = size;
        this._paginationService.changePageSize(size, this._programsPageViewModel.filteredPrograms.length);
        this.pagesCount = this._paginationService.getTotalPages(this._programsPageViewModel.filteredPrograms.length);
        this.goToPage(1);
    }
}
