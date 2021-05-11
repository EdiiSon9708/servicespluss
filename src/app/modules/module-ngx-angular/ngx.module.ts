import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Librería de ngx angular */
import { NgwWowModule } from 'ngx-wow';
import { MaterialFileInputModule } from 'ngx-material-file-input';

import { NgxUploaderModule } from 'ngx-uploader';

/** Librería ngx-bootstrap */
import { TooltipModule } from 'ngx-bootstrap/tooltip';

const NgxComponents = [
  NgwWowModule,
  MaterialFileInputModule,
  NgxUploaderModule,
  TooltipModule.forRoot()
];

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxComponents],
  exports : [NgxComponents]
})
export class NgxModule { }
