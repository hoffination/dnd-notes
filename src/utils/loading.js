export function wrapPromiseWithLoadStatus(commit, apiName, promise) {
  commit('startLoading', apiName);
  return promise.finally(() => commit('endLoading', apiName));
}
