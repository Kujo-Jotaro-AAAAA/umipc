import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';


const Router = require('dva/router').routerRedux.ConnectedRouter;

const routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.js').default,
    "routes": [
      {
        "path": "/404",
        "exact": true,
        "component": require('../404.js').default,
        "_title": "项目脚手架",
        "_title_default": "项目脚手架"
      },
      {
        "path": "/demo/demo2Page",
        "exact": true,
        "component": require('../demo/demo2Page.jsx').default,
        "_title": "项目脚手架",
        "_title_default": "项目脚手架"
      },
      {
        "path": "/demo",
        "exact": true,
        "component": require('../demo/index.jsx').default,
        "_title": "项目脚手架",
        "_title_default": "项目脚手架"
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default,
        "_title": "项目脚手架",
        "_title_default": "项目脚手架"
      },
      {
        "path": "/login",
        "exact": true,
        "component": require('../login/index.js').default,
        "_title": "项目脚手架",
        "_title_default": "项目脚手架"
      },
      {
        "component": () => React.createElement(require('/Users/stanleyxu/Documents/umi-east/umipc/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
        "_title": "项目脚手架",
        "_title_default": "项目脚手架"
      }
    ],
    "_title": "项目脚手架",
    "_title_default": "项目脚手架"
  },
  {
    "component": () => React.createElement(require('/Users/stanleyxu/Documents/umi-east/umipc/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "项目脚手架",
    "_title_default": "项目脚手架"
  }
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
history.listen(routeChangeHandler);
routeChangeHandler(history.location);

export { routes };

export default function RouterWrapper(props = {}) {
  return (
<Router history={history}>
      { renderRoutes(routes, props) }
    </Router>
  );
}
