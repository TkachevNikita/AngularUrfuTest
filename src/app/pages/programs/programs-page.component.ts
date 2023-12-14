import { Component } from "@angular/core";
import { IProgram } from "src/app/interfaces/program.interface";
import { ProgramModel } from "src/app/models/program.model";
import { PaginationService } from "src/app/services/pagination.service";
import { ProgramService } from "src/app/services/program.service";
import { ProgramViewModel } from "src/app/viewmodels/program.viewmodel";
import { ProgramsPageViewModel } from "src/app/viewmodels/programs-page.viewmodel";

@Component({
  templateUrl: 'programs-page.component.html',
  selector: 'app-programs-page',
  styleUrls: ['./styles/programs-page.component.scss']
})
export class ProgramsPage {
  public programsPageViewModel: ProgramsPageViewModel;

  constructor(private _programService: ProgramService) {
      this.programsPageViewModel = new ProgramsPageViewModel(this._programService);
  }
}
