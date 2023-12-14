import { ProgramModel } from "../models/program.model";

export class ProgramViewModel {
    constructor(private _model: ProgramModel) {}

    public logger(): void {
      console.log('logged');
    }
}
