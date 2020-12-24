import { ScullyConfig } from '@scullyio/scully';

require('./scully/plugins/plugin');

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'web',
  outDir: './dist/static',
  routes: {
    '/quotes/:quoteId': {
      type: 'quotable',
      quoteId: {
        amount: 100,
        tags: `technology`,
        sorting: (a: any, b: any) => (a.date < b.date ? 1 : -1),
      },
    },
  },
};
