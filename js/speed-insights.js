/**
 * Vercel Speed Insights initialization
 * Tracks web vitals and performance metrics for the application
 */

import { injectSpeedInsights } from '../node_modules/@vercel/speed-insights/dist/index.mjs';

// Initialize Speed Insights when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectSpeedInsights({
      debug: false, // Set to true for development debugging
      framework: 'vanilla',
    });
  });
} else {
  // DOM is already ready
  injectSpeedInsights({
    debug: false,
    framework: 'vanilla',
  });
}
