import { wrapPromiseWithLoadStatus } from '@/utils/loading';

describe('loading Util', () => {
  describe('wrapPromiseWithLoadStatus', () => {
    let commit;
    let apiName = '/notes';

    beforeEach(() => {
      commit = jasmine.createSpy('commit');
    });

    it('should call commit twice on success', async done => {
      const promise = Promise.resolve('SUCCESS');
      await wrapPromiseWithLoadStatus(commit, apiName, promise).then(result =>
        expect(result).toEqual('SUCCESS'),
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith('startLoading', apiName);
      expect(commit).toHaveBeenCalledWith('endLoading', apiName);
      done();
    });

    it('should call commit twice on failure', async done => {
      const promise = Promise.reject('FAILURE');
      await wrapPromiseWithLoadStatus(commit, apiName, promise).catch(result =>
        expect(result).toEqual('FAILURE'),
      );

      expect(commit).toHaveBeenCalledTimes(2);
      expect(commit).toHaveBeenCalledWith('startLoading', apiName);
      expect(commit).toHaveBeenCalledWith('endLoading', apiName);
      done();
    });
  });
});
