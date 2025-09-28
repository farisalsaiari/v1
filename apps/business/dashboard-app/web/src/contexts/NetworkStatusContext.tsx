import { createContext, useContext, ReactNode } from 'react';
import { useNetworkMonitor } from '../hooks/useNetworkMonitor';

type NetworkStatus = ReturnType<typeof useNetworkMonitor>;

const NetworkStatusContext = createContext<NetworkStatus>({
  isOnline: true,
  isSlowConnection: false,
  effectiveType: '4g',
  downlink: 0,
  rtt: 0,
  saveData: false,
  lastUpdated: Date.now(),
});

export const useNetworkStatus = () => useContext(NetworkStatusContext);

export const NetworkStatusProvider = ({ children }: { children: ReactNode }) => {
  const networkStatus = useNetworkMonitor();

  return (
    <NetworkStatusContext.Provider value={networkStatus}>
      {children}
    </NetworkStatusContext.Provider>
  );
};
