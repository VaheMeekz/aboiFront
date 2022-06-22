const createActionName = (prefix, name) => {
  return `@Adall_${prefix}_${name}`.toUpperCase();
};

export default createActionName;
