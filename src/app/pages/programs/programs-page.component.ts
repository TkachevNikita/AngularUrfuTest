import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { PaginationService } from "src/app/services/pagination.service";
import { PaginationViewModel } from "src/app/viewmodels/pagination.viewmodel";
import { ProgramsPageViewModel } from "src/app/viewmodels/programs-page.viewmodel";

@Component({
  templateUrl: 'programs-page.component.html',
  selector: 'app-programs-page',
  styleUrls: ['./styles/programs-page.component.scss']
})
export class ProgramsPage implements OnInit {
  public programsPageViewModel!: ProgramsPageViewModel;

  constructor
  (
    private _programService: ApiService,
    private _paginationService: PaginationService,
    private cdk: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
      this.programsPageViewModel = new ProgramsPageViewModel(this._programService, this._paginationService, this.cdk);
  }
}
