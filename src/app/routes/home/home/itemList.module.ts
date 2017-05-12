import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ItemListComponent } from './itemList/itemList.component';

import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
  ],
  declarations: [
    ItemListComponent,
  ],
  exports: [
    ItemListComponent
  ]
})
export class ItemListModule { }
