import { useEffect, useState } from 'react';

type NetworkStats = {
  rtt: number;
  downlink: number;
  effectiveType: string;
  saveData: boolean;
  isSlowConnection: boolean;
  lastUpdated: number;
};

const DEFAULT_STATS: NetworkStats = {
  rtt: 0,
  downlink: 0,
  effectiveType: '4g',
  saveData: false,
  isSlowConnection: false,
  lastUpdated: Date.now(),
};

const SLOW_CONNECTION_THRESHOLD = 300; // ms
const POLL_INTERVAL = 10000; // 10 seconds

export function useNetworkMonitor() {
  const [networkStats, setNetworkStats] = useState<NetworkStats>(DEFAULT_STATS);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const updateNetworkInfo = () => {
    // @ts-ignore - navigator.connection is not in TypeScript's default types
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (!connection) {
      return;
    }

    const newStats: NetworkStats = {
      rtt: connection.rtt || 0,
      downlink: connection.downlink || 0,
      effectiveType: connection.effectiveType || '4g',
      saveData: connection.saveData || false,
      isSlowConnection: (connection.rtt > SLOW_CONNECTION_THRESHOLD) || 
                        ['slow-2g', '2g'].includes(connection.effectiveType),
      lastUpdated: Date.now(),
    };

    setNetworkStats(newStats);
  };

  const handleOnline = () => {
    setIsOnline(true);
    updateNetworkInfo();
  };

  const handleOffline = () => {
    setIsOnline(false);
    setNetworkStats(prev => ({
      ...prev,
      isSlowConnection: true,
      lastUpdated: Date.now(),
    }));
  };

  useEffect(() => {
    // Initial update
    updateNetworkInfo();

    // Set up event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // @ts-ignore - navigator.connection is not in TypeScript's default types
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      connection.addEventListener('change', updateNetworkInfo);
    }

    // Poll for updates in case the connection change event isn't reliable
    const intervalId = setInterval(updateNetworkInfo, POLL_INTERVAL);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      
      if (connection) {
        connection.removeEventListener('change', updateNetworkInfo);
      }
      
      clearInterval(intervalId);
    };
  }, []);

  return {
    ...networkStats,
    isOnline,
  };
}
