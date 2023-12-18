import { Component, Input, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';
import { PaginationViewModel } from 'src/app/viewmodels/pagination.viewmodel';
import { ProgramsPageViewModel } from 'src/app/viewmodels/programs-page.viewmodel';

@Component({
    selector: 'app-pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['./styles/pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    @Input() public programsPageViewModel!: ProgramsPageViewModel;
    public paginationViewModel!: PaginationViewModel;

    constructor(public paginationService: PaginationService) {}

    public ngOnInit(): void {
        this.paginationViewModel = new PaginationViewModel(this.paginationService, this.programsPageViewModel);
    }
}
