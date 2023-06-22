export function getDefaultStore() {
  return {
    crawlerRunning: false,
    crawlerCollisions: 0,
    crawlerRequests: 0,
    crawlerLastRun: 0,
    crawlerCards: {},
    crawlerOffline: false,
  };
}
