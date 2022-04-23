import ls from "localstorage-ttl";
import generateKey from "../Utils/generateKey";

export default (requestHandler, url, keyPrefix, ...args) => {
  const getWithExpiry = key => {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return false;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expires_at) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return false;
    }
    return true;
  };

const LANG_KEY = process.env.LANG_KEY || "i18nextLng";
const LANG_KEY_PERSIST = "edited_lang";

const getLan = ()  => {
  const langSetting =localStorage.getItem(LANG_KEY_PERSIST);
  const lang = langSetting || localStorage.getItem(LANG_KEY) ;
  if (lang && typeof lang==="string") return lang.split("-")[0];
  else
  return "en"
};
  const key = `${keyPrefix || 'c'}-${getLan()}-(${generateKey(url)})`;
  const data = ls.get(key);
  if (data && getWithExpiry(key)) {
    return Promise.resolve({data})
  } else {
    return requestHandler(url, ...args).then(r => {
      // this data  will expire in 1 hour
      ls.set(key, r.data, (process.env.REACT_APP_TIME_PERSIST_STORAGE || 60)  * 60 * 1000);
      return r;
    })
  }
}