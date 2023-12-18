import { Component } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';

@Component({
    templateUrl: 'global-error.component.html',
    selector: 'app-global-error',
    styleUrls: ['global-error.component.scss']
})
export class GlobalErrorComponent {
    constructor(public errorService: ErrorService) { }
}
