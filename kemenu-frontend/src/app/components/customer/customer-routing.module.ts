import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerComponent} from './customer.component';

export const routes: Routes = [
  {
    path: '', component: CustomerListComponent,
    children: [
      {path: ':id', component: CustomerComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
