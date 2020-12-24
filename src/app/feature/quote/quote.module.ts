import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QuoteDetailComponent } from './quote-detail.component';
import { QuoteListComponent } from './quote-list.component';

const routes: Routes = [
  { path: '', component: QuoteListComponent },
  { path: ':quoteId', component: QuoteDetailComponent },
  { path: '**', component: QuoteDetailComponent },
];

@NgModule({
  declarations: [QuoteDetailComponent, QuoteListComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class QuoteModule {}
