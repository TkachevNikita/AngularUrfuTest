import { Router } from '@angular/router';
import { ProgramModel } from '../models/program.model';

export class ProgramViewModel {
    constructor(private _model: ProgramModel, private _router: Router) {}

    /**
     * Переход на страницу подробностей
     */
    public openDetails(): void {
        this._router.navigate([`app/programs/${this._model.id}`]);
    }
}
