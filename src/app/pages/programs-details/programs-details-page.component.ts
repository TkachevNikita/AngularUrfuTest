import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IModule } from 'src/app/interfaces/module.interface';
import { ProgramDetailsModel } from 'src/app/models/program-details.model';
import { ApiService } from 'src/app/services/api.service';
import { ProgramsDetailsPageViewModel } from 'src/app/viewmodels/programs-details-page.viewmodel';

@Component({
    templateUrl: 'programs-details-page.component.html',
    styleUrls: ['./styles/programs-details-page.component.scss']
})
export class ProgramsDetailsPage implements OnInit, OnDestroy {
    public programDetails!: ProgramDetailsModel;
    public programsDetailsPageViewModel!: ProgramsDetailsPageViewModel;
    public modules!: IModule[];
    private _subcription$: Subject<void> = new Subject<void>();

    constructor(
      private _apiService: ApiService,
      private _route: ActivatedRoute,
    ) { }

    public ngOnInit(): void {
        this.programsDetailsPageViewModel = new ProgramsDetailsPageViewModel(this._apiService);
        this._route.params
            .pipe(
                takeUntil(this._subcription$)
            )
            .subscribe(params => {
                const id = params['id'];
                this._apiService.getProgramDetails(id).subscribe(details => this.programDetails = details);
                this._apiService.getProgramModules(id).subscribe(modules => this.modules = modules);
            });
    }

    public ngOnDestroy(): void {
        this._subcription$.unsubscribe();
        this.programsDetailsPageViewModel.subscription$.unsubscribe();
    }
}
