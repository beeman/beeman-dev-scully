import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PublicationsComponent } from './publications.component';


const routes: Routes = [
  { path: '', component: PublicationsComponent }
];

@NgModule({
  declarations: [PublicationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PublicationsModule { }
