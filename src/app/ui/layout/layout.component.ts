import { Component } from '@angular/core';

@Component({
  template: `
    <div class="h-full">
      <div class="px-3 py-4 dark:bg-gray-800 shadow">
        <div class="flex justify-between items-center">
          <div class="flex space-x-3">
            <a routerLink="/">
              <img
                class="h-12 w-12 rounded-full border-2 border-yellow-500"
                [src]="header.avatarUrl"
                alt=" User Avatar"
              />
            </a>
            <div>
              <div class="font-semibold text-lg">{{ header.name }}</div>
              <div class="text-xs">{{ header.tagline }}</div>
            </div>
          </div>
          <div class="md:hidden pr-1 flex items-center">
            <button
              (click)="showMobileMenu = !showMobileMenu"
              class="w-6 h-6 bg-yellow-500"
            ></button>
          </div>
        </div>
        <div *ngIf="showMobileMenu" class="pt-4 flex flex-col space-y-3">
          <ng-container *ngFor="let item of header?.items">
            <a
              class="w-full dark:bg-gray-900 dark:text-yellow-500 px-3 py-1 rounded-md"
              (click)="showMobileMenu = false"
              [routerLink]="item.path"
              >{{ item.label }}</a
            >
          </ng-container>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
})
export class LayoutComponent {
  header = {
    avatarUrl: 'https://avatars3.githubusercontent.com/u/36491?v=4',
    name: 'beeman.dev 🐝',
    tagline: 'Author, Developer, Mentor, Teacher',
    items: [
      { label: 'Home', path: '/home' },
      { label: 'Blog', path: '/blog' },
      { label: 'Publications', path: '/publications' },
      { label: 'About', path: '/about' },
      { label: 'Contact', path: '/contact' },
      { label: 'Sponsor', path: '/sponsor' },
    ],
  };
  showMobileMenu = false;
}
