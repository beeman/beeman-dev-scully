import { Component } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { map } from 'rxjs/operators';
const regex = RegExp('/quotes/*');

@Component({
  template: `
    <div class="p-4">
      <div class="bg-white dark:bg-gray-800 shadow rounded-md p-4">
        QUOTE

        <pre>{{ item$ | async | json }}</pre>
      </div>
    </div>
  `,
})
export class QuoteListComponent {
  item$ = this.scully.allRoutes$.pipe(map((routes) => routes));
  constructor(private readonly scully: ScullyRoutesService) {}
}
