import {Component} from '@angular/core';

@Component({
  selector: 'app-failed',
  templateUrl: './failed.component.html',
  styleUrls: ['./failed.component.sass']
})
export class FailedComponent {

  onClicked(): void {
    window.location.reload();
  }

}
