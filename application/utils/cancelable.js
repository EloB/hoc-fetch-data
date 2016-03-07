export default _promise => {
  let cancel;
  const promise = new Promise((resolve, reject) => {
    cancel = () => reject({ isCancelled: true });
    return _promise.then(resolve, reject);
  });
  return {
    promise,
    cancel,
  };
};
