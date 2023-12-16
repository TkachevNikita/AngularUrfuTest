import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IModule } from "src/app/interfaces/module.interface";
import { IRPM } from "src/app/interfaces/rpm.interface";
import { ProgramDetailsModel } from "src/app/models/program-details.model";
import { ApiService } from "src/app/services/api.service";
import { ProgramsDetailsPageViewModel } from "src/app/viewmodels/programs-details-page.viewmodel";

@Component({
    templateUrl: 'programs-details-page.component.html',
    styleUrls: ['./styles/programs-details-page.component.scss']
})
export class ProgramsDetailsPage implements OnInit {
    public programDetails!: ProgramDetailsModel;
    public programsDetailsPageViewModel!: ProgramsDetailsPageViewModel;
    public modules!: IModule[];

    constructor(
      private _apiService: ApiService,
      private _route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
      this.programsDetailsPageViewModel = new ProgramsDetailsPageViewModel(this._apiService);
      this._route.params.subscribe(params => {
        const id = params['id'];
        this._apiService.getProgramDetails(id).subscribe(details => this.programDetails = details);
        this._apiService.getProgramModules(id).subscribe(modules => this.modules = modules);
      });
    }



}
