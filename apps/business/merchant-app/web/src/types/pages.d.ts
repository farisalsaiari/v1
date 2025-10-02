declare module '*.tsx' {
  import { ComponentType } from 'react';
  const component: ComponentType<any>;
  export default component;
}

declare module './pages/Dashboard' {
  import { ComponentType } from 'react';
  const Dashboard: ComponentType<any>;
  export { Dashboard };
}

declare module './pages/Orders' {
  import { ComponentType } from 'react';
  const Orders: ComponentType<any>;
  export { Orders };
}

declare module './pages/Products' {
  import { ComponentType } from 'react';
  const Products: ComponentType<any>;
  export { Products };
}

declare module './pages/Customers' {
  import { ComponentType } from 'react';
  const Customers: ComponentType<any>;
  export { Customers };
}

declare module './pages/Analytics' {
  import { ComponentType } from 'react';
  const Analytics: ComponentType<any>;
  export { Analytics };
}

declare module './pages/Reports' {
  import { ComponentType } from 'react';
  const Reports: ComponentType<any>;
  export { Reports };
}

declare module './pages/Settings' {
  import { ComponentType } from 'react';
  const Settings: ComponentType<any>;
  export { Settings };
}

declare module './pages/Calendar' {
  import { ComponentType } from 'react';
  const Calendar: ComponentType<any>;
  export default Calendar;
}

declare module './pages/Messages' {
  import { ComponentType } from 'react';
  const Messages: ComponentType<any>;
  export default Messages;
}

declare module './pages/Sales' {
  import { ComponentType } from 'react';
  const Sales: ComponentType<any>;
  export default Sales;
}
