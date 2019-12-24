export function set(object, property, value) {
  if (object && typeof object == "object") {
    if (typeof property == "string" && property !== "") {
      const split = property.split(".");
      return split.reduce((obj, prop, idx) => {
        const nextPropIsNumber = Number.isInteger(Number(split[idx + 1]));
        obj[prop] = obj[prop] || (nextPropIsNumber ? [] : {})
        if (split.length == (idx + 1)) obj[prop] = value;
        return obj[prop];
      }, object);
    } else if (typeof property == "number") {
      object[property] = value;
      return object[property];
    } else {
      return object;
    }
  } else {
    return object;
  }
}

export function get(object, property) {
  if (object && typeof object == "object") {
    if (typeof property == "string" && property !== "") {
      var split = property.split(".");
      return split.reduce((obj, prop) => (obj && obj[prop]), object);
    } else if (typeof property == "number") {
      return object[property];
    } else {
      return object;
    }
  } else {
    return object;
  }
}
