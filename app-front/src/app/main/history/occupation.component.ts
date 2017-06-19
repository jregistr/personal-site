import {Component, Input} from '@angular/core';
import {Occupation} from './occupation.interfaces';

@Component({
  selector: 'app-work',
  styleUrls: ['./history.component.sass'],
  templateUrl: './occupation.component.html'
})
export class WorkComponent {
  @Input() occupation: Occupation | null = null;
}
