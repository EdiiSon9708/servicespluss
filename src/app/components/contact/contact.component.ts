import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from '@core/services/message/message.service';
import { FormsPageService } from '@core/services/forms-page/forms-page.service';

import { Question } from '@shared/models/form-page';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact-one',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactOneComponent implements OnInit {

  /** Variables globales */
  contactForm: FormGroup;
  formQuestion: Question = new Question();
  message = 'Campos obligatorios';

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private formsPageService: FormsPageService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.initFormContact();
  }

  get formContact() { return this.contactForm.controls; }

  initFormContact() {
    this.contactForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  async onsubmitContact() {
    if (this.contactForm.invalid) {
      this.messageService.toastError(this.message);
      return;
    } else {
      this.spinner.show();
      this.formQuestion.fullName = this.contactForm.value.fullName;
      this.formQuestion.email = this.contactForm.value.email;
      this.formQuestion.subject = this.contactForm.value.subject;
      this.formQuestion.message = this.contactForm.value.message;
      this.spinner.hide();
      try {
        await this.formsPageService.createQuestion(this.formQuestion).subscribe(resp => {
          if (resp.status === 1) {
            this.spinner.hide();
            this.resetForm();
            this.messageService.alertSuccess(resp.msn);
          } else {
            this.spinner.hide();
            console.warn(resp.data);
            this.messageService.toastError(resp.msn);
          }
        });
      } catch (error) {
        this.spinner.hide();
        this.formsPageService.handlerError(error);
        console.error('Error onsubmitContact en componente contact', error);
      }

    }
  }

  resetForm() {
    this.contactForm.get('fullName').reset();
    this.contactForm.get('email').reset();
    this.contactForm.get('subject').reset();
    this.contactForm.get('message').reset();
  }

}
