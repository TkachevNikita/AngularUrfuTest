import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ProgramModel } from "src/app/models/program.model";
import { ProgramViewModel } from "src/app/viewmodels/program.viewmodel";

@Component({
    templateUrl: 'program.component.html',
    selector: 'app-program',
    styleUrls: ['./styles/program.component.scss']
})
export class ProgramComponent implements OnInit {
    @Input() public program!: ProgramModel;
    public programViewModel!: ProgramViewModel;

    constructor(private _router: Router) {}

    ngOnInit(): void {
        this.programViewModel = new ProgramViewModel(this.program, this._router);
    }
}
