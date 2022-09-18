import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

// Using a pipe retains the original format in the model, but allows us to display it nicely.
// js Date object and moment both don't like the format coming from the api call. 
@Pipe({ name: 'dateFormat' })
export class MomentPipe implements PipeTransform {
    transform(value: string, dateFormat: string): any {
        let date: moment.Moment = moment(value, "YYYY-MM-DD");
        return date.format(dateFormat);
    }
}