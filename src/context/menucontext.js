import { createContext } from 'react';

const menuContext = createContext({ opened: false, openAction: () => {} });

export default menuContext;