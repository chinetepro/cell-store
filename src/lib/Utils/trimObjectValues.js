import _trim from "lodash/trim";
import _mapValues from "lodash/mapValues";
import _map from "lodash/map";
import _isString from "lodash/isString";
import _isArray from "lodash/isArray";
import _isObject from "lodash/isObject";

const trimObject = (elem) => {
  if (_isString(elem)) {
    return _trim(elem);
  } else if (_isArray(elem)) {
    return _map(elem, trimObject);
  } else if (_isObject(elem)){
    return _mapValues(elem, trimObject)
  } else {
    return elem
  }
};

export default trimObject