import React, {
  useEffect,
} from 'react';
import routes from './router';
import { History } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import LocalStore from './utils/LocalStore';

interface IApp {
  history: History;
}

const ROUTE_BASE_NAME = process.env.PUBLIC_URL || '';
const BASE_NAME = ROUTE_BASE_NAME ? ROUTE_BASE_NAME.replace('/', '') : '';

const OLD_LESS_ID = `less:${BASE_NAME ? BASE_NAME + '-' : ''}color:old`;

function App ({ history }: IApp)  {

// 只需要页面首次加载的时候，执行一次即可。所以千万不要添加依赖项
  useEffect(() => {
    // 快速生效的办法
    const themeStyleContent = LocalStore.get('theme-style-content');
    if( themeStyleContent ) {
      const themeStyle = document.createElement('style');
      themeStyle.id = OLD_LESS_ID;
      themeStyle.innerHTML = themeStyleContent;
      document.body.insertBefore(themeStyle, document.body.firstChild);
    }

  }, []);
  return (
    <ConnectedRouter history={history}>
      {
        routes
      }
    </ConnectedRouter>
  );
}

export default App;
