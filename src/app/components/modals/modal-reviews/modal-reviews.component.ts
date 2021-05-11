import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { FormsPageService } from '@core/services/forms-page/forms-page.service';
import { MessageService } from '@core/services/message/message.service';

import { Review } from '@shared/models/form-page';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-modal-reviews',
  templateUrl: './modal-reviews.component.html',
  styleUrls: ['./modal-reviews.component.scss']
})
export class ModalReviewsComponent implements OnInit {

  /** Variables globales */
  reviewForm: FormGroup;
  formReview: Review = new Review();
  message = 'Los campos descripción y calificar son obligatorios';

  constructor(private formBuilder: FormBuilder, private messageService: MessageService,
              private formsPageService: FormsPageService, private spinner: NgxSpinnerService,
              public dialogRef: MatDialogRef<ModalReviewsComponent>) { }

  ngOnInit(): void {
    this.initFormContact();
  }

  initFormContact() {
    this.reviewForm = this.formBuilder.group({
      reviews: ['', [Validators.required, Validators.maxLength(500)]],
      calification: ['', Validators.required],
    });
  }

  async onsubmitReview() {
    if (this.reviewForm.invalid) {
      this.messageService.toastError(this.message);
      return;
    } else {
      this.spinner.show();
      this.formReview.reviews = this.reviewForm.value.reviews;
      this.formReview.calification = this.reviewForm.value.calification;
      try {
        await this.formsPageService.createReview(this.formReview).subscribe(resp => {
          if (resp.status === 1) {
            this.spinner.hide();
            this.resetForm();
            this.messageService.alertSuccess(resp.msn);
            this.dialogRef.close();
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
    this.reviewForm.get('reviews').reset();
    this.reviewForm.get('calification').reset();
  }

}
