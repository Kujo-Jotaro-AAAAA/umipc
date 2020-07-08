import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'global', ...(require('/Users/stanleyxu/Documents/umi-east/umipc/src/models/global.js').default) });
app.model({ namespace: 'demo', ...(require('/Users/stanleyxu/Documents/umi-east/umipc/src/pages/demo/models/demo.js').default) });
app.model({ namespace: 'login', ...(require('/Users/stanleyxu/Documents/umi-east/umipc/src/pages/login/models/login.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
