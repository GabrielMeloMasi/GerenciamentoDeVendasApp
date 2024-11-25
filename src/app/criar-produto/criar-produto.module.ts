import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarProdutoPageRoutingModule } from './criar-produto-routing.module';

import { CriarProdutoPage } from './criar-produto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarProdutoPageRoutingModule
  ],
  declarations: [CriarProdutoPage]
})
export class CriarProdutoPageModule {}
