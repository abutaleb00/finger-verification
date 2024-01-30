import { useEffect, useState, useCallback, useRef } from "react";

export const useIdleSession = (config) => {
  const [lastActive, setLastActive] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [idleTime, setIdleTime] = useState(0);

  const intervalId = useRef();
  const logoutIntervalId = useRef();

  const isLoggedIn = true;

  //function to handle user activity
  const handleUserActivity = useCallback(() => {
    setLastActive(new Date());
    setOpen(false);
    clearTimeout(logoutIntervalId.current);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalId.current);
      clearTimeout(logoutIntervalId.current);
    };
  }, []);

  // useEffect to check for user activity every minute
  useEffect(() => {
    if (isLoggedIn) {
      // setInterval to check for user activity
      intervalId.current = setInterval(() => {
        // get current time
        const currentTime = new Date();
        // calculate idle time
        const idle = currentTime - lastActive;
        // check if user has been idle for more than the threshold time
        if (idle > config.threshold) {
          setIdleTime(idle);
          setOpen(true);
          // set a timeout to run the action if they do not click the "Keep Session Active" button
          logoutIntervalId.current = setTimeout(config.action, config.timeout);
        }
      }, config.threshold);
      // cleanup function to clear interval when component unmounts
      // document.addEventListener('mousemove', handleUserActivity);
      // document.addEventListener('keypress', handleUserActivity);
      return () => {
        clearInterval(intervalId.current);
        // document.removeEventListener('mousemove', handleUserActivity);
        // document.removeEventListener('keypress', handleUserActivity);
      };
    }
  }, [isLoggedIn, lastActive, handleUserActivity, config]);

  return { open, idleTime, handleUserActivity };
};
