import {Component, Input} from '@angular/core';
import {Experience} from './interfaces';

@Component({
  selector: 'app-work',
  styleUrls: ['./experience.component.sass'],
  templateUrl: './work.component.html'
})
export class WorkComponent {
  @Input() experience: Experience | null = null;
}
