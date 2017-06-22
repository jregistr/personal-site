import {Component, Input} from '@angular/core';
import {Occupation} from '../../../data/main.interfaces';

@Component({
  selector: 'app-work',
  styleUrls: ['./history.component.sass'],
  templateUrl: './occupation.component.html'
})
export class WorkComponent {
  @Input() occupation: Occupation | null = null;
}
