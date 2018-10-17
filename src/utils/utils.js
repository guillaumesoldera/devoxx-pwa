/**
 * <div { ...className({ active: true }) }></div>
 */
export function className(obj) {
    const className = classSet(obj);
    return className ? { className } : { };
  }

/**
 * <div className={classSet({ active: true })}></div>
 */
export function classSet(obj) {
  return Object.keys(obj).filter(k => obj[k]).join(' ');
}

export function chunk(size, list) {
  return list.reduce((acc, curr, i, self) => {
    if ( !(i % size)  ) {  
      return [
          ...acc,
          self.slice(i, i + size),
        ];
    }
    return acc;
  }, []);
}

export function isOnDesktop() {
  if("matchMedia" in window) {
    return window.matchMedia("(min-width:992px)").matches;
  }
  return false;
}

export function isOnMediumScreen() {
  return !isOnSmallScreen() && !isOnDesktop();
}


export function isOnSmallScreen() {
  if("matchMedia" in window) {
    return !(window.matchMedia("(min-width:768px)").matches);
  }
  return false;
}

export const Devices = Object.freeze({
  ios: Symbol('IOS'),
  android:  Symbol('ANDROID'),
  windowsPhone: Symbol('WINDOWS_PHONE'),
});


export function getDevice() {
  const userAgent = navigator.userAgent;
  const iOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  if (iOS) {
    return Devices.ios
  } else {
    const windowsPhone = /Windows Phone/.test(userAgent);
    if (windowsPhone) {
      return Devices.windowsPhone
    } else {
      if (/android/i.test(userAgent))
      {
        return Devices.android;
      }
    }
  }
  return undefined;
}

export const favouritesEnabled = window.indexedDB