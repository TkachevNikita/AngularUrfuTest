// info-format.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'infoFormat'
})
export class InfoFormatPipe implements PipeTransform {
    public transform(value: any, fieldPath: string): string {
        if (!value) {
            return 'Информация отсутствует';
        }

        const fields = fieldPath.split('.');
        let result = value;

        for (const field of fields) {
            if (result && result[field] !== undefined) {
                result = result[field];
            } else {
                return 'Информация отсутствует';
            }
        }

        return result;
    }
}
