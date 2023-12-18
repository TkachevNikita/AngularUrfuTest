import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

Injectable({
    providedIn: 'root'
});
export class ErrorService {
    public $error = new Subject<string>();

    /**
     * Отображение ошибки
     * @param {string} message Текст ошибки
     */
    public handle(message: string): void {
        this.$error.next(message);
    }

    /**
     * Удаление ошибки
     */
    public clear(): void {
        this.$error.next('');
    }
}
