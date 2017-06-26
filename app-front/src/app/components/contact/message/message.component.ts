import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReCaptchaComponent} from 'angular2-recaptcha';
import {AppSettingsDatabaseService} from '../../../services/app-settings-database.service';
import 'jquery';

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
      this.processingForm = true;
      const formValue = this.messageForm.value;
      const self = this;
      const capchaCode = this.capchaToken;
      $.ajax(jsRoutes.controllers.MailController.index(capchaCode, formValue.name, formValue.email,
        formValue.subject, formValue.message))
        .done(() => {
          self.processingForm = false;
          self.sendState = 1;
        })
        .fail(() => {
          self.processingForm = false;
          self.sendState = -1;
        });
      this.messageForm.reset();
      this.onCapchaExpired();
    } else {
      this.captcha.reset();
    }
  }

  onDismissAlert(): void {
    this.sendState = 0;
  }

}
