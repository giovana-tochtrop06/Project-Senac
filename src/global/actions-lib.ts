import { getTrackerName, waitCondition } from './helpers';

const GA_UA = 'UA-XXXXXXX-X';

function sendGAEvent(action: string, label = '-', nonInteraction = false): void {
  waitCondition(
    () => window.ga && window.ga.getAll,
    () => {
      const gaTrackerName = getTrackerName(GA_UA);

      if (!gaTrackerName) {
        console.warn(`GA ${GA_UA} not found.`);
        return;
      }

      window.ga(`${gaTrackerName}.send`, 'event', 'Pmweb', action, label, {
        nonInteraction,
      });
    },
  );
}

export default sendGAEvent;
