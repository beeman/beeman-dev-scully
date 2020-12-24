import { httpGetJson, registerPlugin, routeSplit } from '@scullyio/scully';
import { RouteConfig } from '@scullyio/scully/src/lib/routerPlugins';

export const myPlugin = 'myPlugin';

const myFunctionPlugin = async (html: string): Promise<string> => {
  return html;
};

const validator = async () => [];

registerPlugin('render', myPlugin, myFunctionPlugin, validator);

const MEETUP_URI = (tags, amount) =>
  `http://api.quotable.io/quotes?tags=${tags}&limit=${amount}`;

const defaultConfig = {
  amount: 100,
  tags: `technology`,
  sorting: (a, b) => (a.date < b.date ? 1 : -1),
};

export const quotablePlugin = async (
  route: string,
  routeConfig: RouteConfig
) => {
  const { createPath, params } = routeSplit(route);
  const param = params[0].part;
  const config = { ...defaultConfig, ...routeConfig[param] };
  const url = MEETUP_URI(config.tags, config.amount).trim();
  console.log({ params, param, config, url });
  const list = (await httpGetJson(url)) as { results: any[] };

  console.log('list', list);
  const handledRoutes = [];
  for (const item of list.results) {
    console.log('item', item);
    handledRoutes.push({
      route: createPath(item._id),
      data: {
        title: item.name,
        date: new Date(item.time),
        status: item.status,
        yes_rsvp_count: item.yes_rsvp_count,
        is_online_event: item.is_online_event,
        local_time: item.local_time,
        link: item.link,
      },
    });
  }

  return handledRoutes.sort(routeConfig[param].sorting);
};

registerPlugin('router', 'quotable', quotablePlugin);
