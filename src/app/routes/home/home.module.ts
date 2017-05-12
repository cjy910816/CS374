import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { CartModule } from './home/cart.module';
import { ItemListModule } from './home/itemList.module';

import { OrderBy } from './orderBy'


const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
      RouterModule.forChild(routes),
      CartModule,
      ItemListModule
    ],
    declarations: [
      HomeComponent,
      OrderBy
    ],
    exports: [
        RouterModule
    ]
})
export class HomeModule { }
