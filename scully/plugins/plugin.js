"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quotablePlugin = exports.myPlugin = void 0;
const scully_1 = require("@scullyio/scully");
exports.myPlugin = 'myPlugin';
const myFunctionPlugin = async (html) => {
    return html;
};
const validator = async () => [];
scully_1.registerPlugin('render', exports.myPlugin, myFunctionPlugin, validator);
const MEETUP_URI = (tags, amount) => `http://api.quotable.io/quotes?tags=${tags}&limit=${amount}`;
const defaultConfig = {
    amount: 100,
    tags: `technology`,
    sorting: (a, b) => (a.date < b.date ? 1 : -1),
};
exports.quotablePlugin = async (route, routeConfig) => {
    const { createPath, params } = scully_1.routeSplit(route);
    const param = params[0].part;
    const config = { ...defaultConfig, ...routeConfig[param] };
    const url = MEETUP_URI(config.tags, config.amount).trim();
    console.log({ params, param, config, url });
    const list = (await scully_1.httpGetJson(url));
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
scully_1.registerPlugin('router', 'quotable', exports.quotablePlugin);
//# sourceMappingURL=plugin.js.map