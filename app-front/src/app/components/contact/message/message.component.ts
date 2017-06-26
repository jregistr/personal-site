import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReCaptchaComponent} from 'angular2-recaptcha';
import {AppSettingsDatabaseService} from '../../../services/app-settings-database.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  capchaSiteKey: string | null = null;

  messageForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    subject: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    message: new FormControl(null, [Validators.required, Validators.maxLength(250)])
  });

  charactersLeft = 250;

  capchaToken = '';
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  processingForm = false;
  sendState = 0;

  constructor(private appConfigDatabase: AppSettingsDatabaseService) {
    appConfigDatabase.appSettings.then(value => {
      this.capchaSiteKey = value.capchaPublicId
    }).catch(reason => console.log(reason));
  }

  ngOnInit(): void {
    this.messageForm.valueChanges.subscribe(data => {
      this.charactersLeft = data.message !== null ? 250 - data.message.length : 250;
    });
  }

  onHandleCapcha(event: any): void {
    this.capchaToken = event;
  }

  onCapchaExpired(): void {
    this.capchaToken = '';
    this.captcha.reset();
  }

  onFormSubmit(): void {
    if (this.messageForm.valid) {
      this.messageForm.reset();
      this.onCapchaExpired();
      this.processingForm = true;
      setTimeout(() => {
        this.processingForm = false;
        this.sendState = -1;
      }, 5000);
    } else {
      this.captcha.reset();
    }
  }

  onDismissAlert(): void {
    this.sendState = 0;
  }

}
