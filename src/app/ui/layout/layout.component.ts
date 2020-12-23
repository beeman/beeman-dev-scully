import { Component } from '@angular/core';
import { LayoutStore } from './layout.store';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <div class="h-full">
        <div class="md:grid md:grid-cols-12 h-full">
          <div
            class="px-3 py-4 md:col-span-3 bg-gray-300 dark:bg-gray-800 shadow"
          >
            <div class="flex justify-between items-center md:h-full md:w-full">
              <div
                class="flex md:flex-col md:justify-center md:items-center space-x-3 md:space-x-0 md:space-y-6  md:w-full"
              >
                <a routerLink="/">
                  <img
                    height="48px"
                    width="48px"
                    class="md:hidden rounded-full border-2 border-yellow-500"
                    [src]="vm?.avatarUrl"
                    alt=" User Avatar"
                  />
                  <img
                    height="132px"
                    width="132px"
                    class="hidden md:inline-block rounded-full border-2 border-yellow-500"
                    [src]="vm?.avatarUrl"
                    alt=" User Avatar"
                  />
                </a>
                <div class="md:flex md:flex-col md:items-center md:space-y-2">
                  <div class="font-semibold text-lg md:text-2xl md:mb-3">
                    {{ vm?.name }}
                  </div>
                  <div class="text-xs md:text-sm">{{ vm?.tagline }}</div>
                </div>
                <div class="md:block space-y-3 hidden md:w-full">
                  <ng-container *ngFor="let item of vm?.items">
                    <a
                      class="block dark:bg-gray-900 text-yellow-500 bg-gray-600 text-center text-lg px-3 py-2 rounded-md"
                      (click)="this.hideMobileMenu()"
                      [routerLink]="item.path"
                      >{{ item.label }}</a
                    >
                  </ng-container>
                </div>
                <div
                  class="md:flex items-center justify-center space-x-3 hidden md:w-full"
                >
                  <ng-container *ngFor="let item of vm?.social">
                    <a
                      class="dark:bg-gray-900 dark:text-yellow-500 flex items-center justify-center text-lg w-9 h-9 rounded-md"
                      (click)="this.hideMobileMenu()"
                      [href]="item.url"
                      rel="noopener"
                      target="_blank"
                      >{{ item.icon }}</a
                    >
                  </ng-container>
                </div>
                <div
                  class="md:flex items-center justify-center space-x-3 hidden md:w-full"
                >
                  <button
                    class="dark:bg-gray-900 dark:text-yellow-500 flex items-center justify-center text-lg w-9 h-9 rounded-md"
                    (click)="this.toggleTheme()"
                  >
                    {{ vm.theme === 'dark' ? 'L' : 'D' }}
                  </button>
                </div>
              </div>
              <div class="md:hidden pr-1 flex items-center">
                <button
                  aria-label="Toggle Mobile Menu"
                  (click)="toggleMobileMenu()"
                  class="w-6 h-6 bg-yellow-500"
                ></button>
              </div>
            </div>

            <ng-container *ngIf="vm?.showMobileMenu">
              <div class="pt-4 flex flex-col space-y-3 md:hidden">
                <ng-container *ngFor="let item of vm?.items">
                  <a
                    class="w-full block dark:bg-gray-900 dark:text-yellow-500 px-3 py-1 rounded-md"
                    (click)="this.hideMobileMenu()"
                    [routerLink]="item.path"
                    >{{ item.label }}</a
                  >
                </ng-container>
              </div>
              <div class="pt-4">
                <button
                  class="block dark:bg-gray-900 dark:text-yellow-500 flex items-center justify-center text-lg w-9 h-9 rounded-md"
                  (click)="this.toggleTheme()"
                >
                  {{ vm.theme === 'dark' ? 'L' : 'D' }}
                </button>
              </div>
            </ng-container>
          </div>
          <main class="md:col-span-9">
            <router-outlet></router-outlet>
          </main>
        </div>
      </div>
    </ng-container>
  `,
  providers: [LayoutStore],
})
export class LayoutComponent {
  readonly vm$ = this.layoutStore.vm$;
  constructor(private readonly layoutStore: LayoutStore) {}

  toggleMobileMenu(): void {
    this.layoutStore.toggleMobileMenu();
  }
  hideMobileMenu(): void {
    this.layoutStore.hideMobileMenu();
  }

  toggleTheme(): void {
    this.layoutStore.toggleTheme();
  }
}
