import { of } from "rxjs";
import { ProgramModel } from "../models/program.model";
import { ProgramService } from "../services/program.service";

export class ProgramsPageViewModel {

    public programs!: ProgramModel[];
    public displayedPrograms!: ProgramModel[];

    constructor(private _programService: ProgramService) {
        this._programService.getPrograms().subscribe((programs) => {
            this.programs = programs.splice(0, programs.length)
        });
    }
}

