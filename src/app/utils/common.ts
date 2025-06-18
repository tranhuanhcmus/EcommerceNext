const CommonUtils = {
  cleanObject(obj: any) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== undefined)
    ) as any;
  },
};

export default CommonUtils;
