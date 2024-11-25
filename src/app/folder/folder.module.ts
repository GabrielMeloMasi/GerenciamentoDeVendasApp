import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SalesComponent } from '../sales/sales.component';
import { FolderPageRoutingModule } from './folder-routing.module';
import { ReportsComponent } from '../reports/reports.component';
import { FolderPage } from './folder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage, SalesComponent, ReportsComponent]
})
export class FolderPageModule {}
