import { of } from "rxjs";
import { ProgramModel } from "../models/program.model";
import { ApiService } from "../services/api.service";
import { PaginationService } from "../services/pagination.service";
import { ChangeDetectorRef } from "@angular/core";

export class ProgramsPageViewModel {

    public programs!: ProgramModel[];
    public displayedPrograms!: ProgramModel[];
    public filteredPrograms!: ProgramModel[];

    constructor(private _programService: ApiService, private _paginationService: PaginationService, private _cdk: ChangeDetectorRef) {
        this._programService.getPrograms().subscribe((programs) => {
            this.programs = programs;
            this.filteredPrograms = [...programs];
            this._cdk.detectChanges();
        });
    }


    /**
     * Фильтрация поиском
     * @param event Значение search input
     */
    public filterItems(event: Event): void {
      setTimeout(() => {
          const searchTerm = (event.target as HTMLInputElement).value;
          this.filteredPrograms = this.programs.filter(program =>
              program.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          this.displayedPrograms = this.filteredPrograms.slice(this._paginationService.getStartIndex() - 1, this._paginationService.getEndIndex(this.filteredPrograms.length))
          this._cdk.detectChanges();
      }, 500)
  }
}

