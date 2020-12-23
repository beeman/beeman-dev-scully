import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SponsorComponent } from './sponsor.component';


const routes: Routes = [
  { path: '', component: SponsorComponent }
];

@NgModule({
  declarations: [SponsorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SponsorModule { }
