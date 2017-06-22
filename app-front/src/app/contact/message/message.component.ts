import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReCaptchaComponent} from 'angular2-recaptcha';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  messageForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    subject: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
    message: new FormControl(null, [Validators.required, Validators.maxLength(250)])
  });

  charactersLeft = 250;

  capchaToken = '';
  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  constructor() {

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
    console.log(this.capchaToken);
    if (this.messageForm.valid) {
      this.messageForm.reset();
      this.onCapchaExpired();
    } else {
      this.captcha.reset();
    }
  }

}
