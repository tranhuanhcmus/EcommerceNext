const CommonUtils = {
  cleanObject(obj: any) {
    // remove undefined properties in object
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined)
    ) as any;
  },
};

export default CommonUtils;
