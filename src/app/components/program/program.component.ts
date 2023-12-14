import { Component, Input } from "@angular/core";
import { ProgramModel } from "src/app/models/program.model";
import { ProgramViewModel } from "src/app/viewmodels/program.viewmodel";

@Component({
    templateUrl: 'program.component.html',
    selector: 'app-program',
    styleUrls: ['./styles/program.component.scss']
})
export class ProgramComponent {
    @Input() public program!: ProgramModel;
    public programViewModel: ProgramViewModel = new ProgramViewModel(this.program);
}
