const stateCollection = new Map();
const subscribers = new Map();

const initModule = (module, state) => {
  !stateCollection.has(module) && stateCollection.set(module, state)
};

export const watcher = (module, fn) => {
  if (subscribers.has(module)) {
    const set = subscribers.get(module);
    !set.has(fn) && set.add(fn);
    subscribers.set(module, set)
  } else {
    subscribers.set(module, new Set([fn]))
  }
  return {module, fn}
};

export const takeoff = ({module, fn}) => {
  if (subscribers.has(module)) {
    const set = subscribers.get(module);
      set.has(fn) && set.delete(fn);
      subscribers.set(module, set)
  }
};

const notify = (module, newValue, oldValue) => {
  if (subscribers.has(module)) {
    const set = subscribers.get(module);
    set.forEach(fn => fn(newValue, oldValue))
  }
};

const getValue = (module) => {
  return stateCollection.get(module);
};

const setValue = (module, value) => {
  const oldValue = getValue(module);
  stateCollection.set(module, value);
  notify(module, value, oldValue);
};

export const observe = (module, value) => {
  initModule(module, value);
  return (...args) => {
    switch (args.length) {
      case 0:
        return getValue(module);
      case 1:
        return setValue(module, args[0]);
      default:
        throw new Error("Expected 0 or 1 arguments");
    }
  }
};