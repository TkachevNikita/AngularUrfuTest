import { of } from "rxjs";
import { ProgramModel } from "../models/program.model";
import { ApiService } from "../services/api.service";
import { PaginationService } from "../services/pagination.service";

export class ProgramsPageViewModel {

    public programs!: ProgramModel[];
    public displayedPrograms!: ProgramModel[];
    public filteredPrograms!: ProgramModel[];

    constructor(private _programService: ApiService, private _paginationService: PaginationService) {
        this._programService.getPrograms().subscribe((programs) => {
            this.programs = programs;
            this.filteredPrograms = [...programs];
        });
    }

    public filterItems(event: Event): void {
      setTimeout(() => {
          const searchTerm = (event.target as HTMLInputElement).value;
          this.filteredPrograms = this.programs.filter(program =>
              program.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          this.displayedPrograms = this.filteredPrograms.slice(this._paginationService.getStartIndex() - 1, this._paginationService.getEndIndex(this.filteredPrograms.length))
      }, 500)
  }
}

