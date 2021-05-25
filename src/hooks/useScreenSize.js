/**
 * A custom hook to get the user's screen size in terms of Material UI's
 * breakpoint naming convention.
 */

import { useState, useEffect } from 'react';

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

/**
 * Returns user's screen size('xs', 'sm', 'md', 'lg', 'xl') and
 * a function to recalculate the screen size.
 */
export default () => {
  const [screenSize, setScreenSize] = useState(null);

  const handleScreenSize = () => {
    const width = window.innerWidth;
    if (width <= breakpoints.sm) {
      setScreenSize('xs');
    } else if (breakpoints.sm < width && width <= breakpoints.md) {
      setScreenSize('sm');
    } else if (breakpoints.md < width && width <= breakpoints.lg) {
      setScreenSize('md');
    } else if (breakpoints.lg < width && width <= breakpoints.xl) {
      setScreenSize('lg');
    } else {
      setScreenSize('xl');
    }
  };

  useEffect(() => handleScreenSize(), []);

  return [screenSize, handleScreenSize];
};
