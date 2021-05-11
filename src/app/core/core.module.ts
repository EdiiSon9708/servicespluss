/** Componentes para utilizar la pagina */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/** Componentes estáticos la pagina web general */
import { FooterComponent } from '@app/core/footer/footer.component';
import { HeaderComponent } from '@app/core/header/header.component';
import { ScrollupComponent } from '@app/core/scrollup/scrollup.component';

/** Modal de terminos y condiciones */
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    ScrollupComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    ScrollupComponent
  ]
})
export class CoreModule { }
