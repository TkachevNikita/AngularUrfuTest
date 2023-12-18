import { BehaviorSubject, Subject, debounceTime, filter, map, takeUntil } from 'rxjs';
import { ProgramModel } from '../models/program.model';
import { ApiService } from '../services/api.service';
import { PaginationService } from '../services/pagination.service';
import { ChangeDetectorRef } from '@angular/core';

export class ProgramsPageViewModel {

    public programs$: BehaviorSubject<ProgramModel[]> = new BehaviorSubject<ProgramModel[]>([]);
    public displayedPrograms$: BehaviorSubject<ProgramModel[]> = new BehaviorSubject<ProgramModel[]>([]);
    public filteredPrograms$: BehaviorSubject<ProgramModel[]> = new BehaviorSubject<ProgramModel[]>([]);
    public subscription$: Subject<void> = new Subject();
    private _searchTerm$ = new Subject<string>();

    constructor(private _programService: ApiService, private _paginationService: PaginationService, private _cdk: ChangeDetectorRef) {
        this._programService.getPrograms()
            .pipe(
                takeUntil(this.subscription$)
            )
            .subscribe((programs) => {
                this.programs$.next(programs);
                this.filteredPrograms$.next([...programs]);
                this._cdk.detectChanges();
            });

        this._searchTerm$
            .pipe(
                debounceTime(500),
                takeUntil(this.subscription$)
            )
            .subscribe(searchTerm => {
                this.filteredPrograms$.next(this.programs$.getValue().filter(program => program.name.toLowerCase().includes(searchTerm.toLowerCase())));
                this.updateDisplayedValue(this.filteredPrograms$.getValue());
            });
    }

    /**
     * Обновление списка отображаемых элементов на странице
     * @param {ProgramModel[]} programs Количество образовательных программ
     */
    public updateDisplayedValue(programs: ProgramModel[]): void {
        const startIndex = this._paginationService.getStartIndex() - 1;
        const endIndex = this._paginationService.getEndIndex(programs.length);
        this.displayedPrograms$.next(programs.slice(startIndex, endIndex));
    }

    /**
     * Фильтрация поиском
     * @param event Значение search input
     */
    public filterItems(event: Event): void {
        const searchTerm = (event.target as HTMLInputElement).value;
        this._searchTerm$.next(searchTerm);
        this._paginationService.currentPage = 1;
    }
}

