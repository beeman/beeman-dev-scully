import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { UiModule } from './ui/ui.module';
import { ScullyLibModule } from '@scullyio/ng-lib';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () =>
          import('./feature/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('./feature/blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./feature/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./feature/contact/contact.module').then(
            (m) => m.ContactModule
          ),
      },
      {
        path: 'sponsor',
        loadChildren: () =>
          import('./feature/sponsor/sponsor.module').then(
            (m) => m.SponsorModule
          ),
      },
      {
        path: 'publications',
        loadChildren: () =>
          import('./feature/publications/publications.module').then(
            (m) => m.PublicationsModule
          ),
      },
    ],
  },
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), UiModule, ScullyLibModule],
})
export class AppModule {}
