import { actions } from '@/store/store';
import graphqlClient from '@/utils/graphql';
import * as noteTransform from '@/utils/NoteTransform';
import * as loading from '@/utils/loading';

describe('storeActions', () => {
  describe('openAddNoteModal', () => {
    it('should commit the openAddNoteModal action', () => {
      const commit = jasmine.createSpy('commit');
      actions.openAddNoteModal({ commit });
      expect(commit).toHaveBeenCalledWith('openAddNoteModal');
    });
  });

  describe('closeAddNoteModal', () => {
    it('should commit the closeAddNoteModal action', () => {
      const commit = jasmine.createSpy('commit');
      actions.closeAddNoteModal({ commit });
      expect(commit).toHaveBeenCalledWith('closeAddNoteModal');
    });
  });

  describe('requestNotes', () => {
    it('should process and commit the transformed result of a GQL request', done => {
      const commit = jasmine.createSpy('commit');
      const result = Promise.resolve({ data: { notes: 'GQL_RESULT' } });
      spyOn(graphqlClient, 'query').and.returnValue(result);
      spyOn(noteTransform, 'noteArrayToIndexMap').and.returnValue(
        Promise.resolve('RESULT'),
      );
      spyOn(loading, 'wrapPromiseWithLoadStatus').and.callFake((c, n, p) => p);

      const noteRequest = actions.requestNotes({ commit });
      noteRequest.then(request => {
        expect(request).toEqual('RESULT');
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith('loadNotes', 'RESULT');
        done();
      });
    });
  });

  describe('addNote', () => {
    it('should process and commit the transformed result of a GQL request', done => {
      const commit = jasmine.createSpy('commit');
      const result = Promise.resolve({ data: { addNote: 'GQL_RESULT' } });
      spyOn(graphqlClient, 'mutate').and.returnValue(result);
      spyOn(noteTransform, 'noteArrayToIndexMap').and.returnValue(
        Promise.resolve('RESULT'),
      );
      spyOn(loading, 'wrapPromiseWithLoadStatus').and.callFake((c, n, p) => p);

      const noteRequest = actions.addNote({ commit }, {});
      noteRequest.then(request => {
        expect(request).toEqual('RESULT');
        expect(commit).toHaveBeenCalledTimes(2);
        expect(commit).toHaveBeenCalledWith('appendNotes', 'RESULT');
        done();
      });
    });
  });

  describe('addItem', () => {
    it('should process and commit the transformed result of a GQL request', done => {
      const commit = jasmine.createSpy('commit');
      const resultItem = { _id: 'GQL_RESULT', created: '0' };
      const result = Promise.resolve({ data: { addItem: resultItem } });
      spyOn(graphqlClient, 'mutate').and.returnValue(result);
      spyOn(loading, 'wrapPromiseWithLoadStatus').and.callFake((c, n, p) => p);

      const noteRequest = actions.addItem({ commit }, {});
      noteRequest.then(request => {
        const resultData = {
          [resultItem._id]: {
            ...resultItem,
            createdDate: noteTransform.dateStrParse('0'),
          },
        };
        expect(request).toEqual(resultData);
        expect(commit).toHaveBeenCalledTimes(1);
        expect(commit).toHaveBeenCalledWith('appendNotes', resultData);
        done();
      });
    });
  });

  describe('setPreviousNote', () => {
    it('should commit the setPreviousNote action with a passed noteId', () => {
      const commit = jasmine.createSpy('commit');
      actions.setPreviousNote({ commit }, 1);
      expect(commit).toHaveBeenCalledWith('setPreviousNote', 1);
    });
  });

  describe('resetPreviousNote', () => {
    it('should commit the resetPreviousNote action', () => {
      const commit = jasmine.createSpy('commit');
      actions.resetPreviousNote({ commit });
      expect(commit).toHaveBeenCalledWith('resetPreviousNote');
    });
  });

  describe('setSortType', () => {
    it('should commit the setSortType action with a passed type', () => {
      const commit = jasmine.createSpy('commit');
      actions.setSortType({ commit }, 1);
      expect(commit).toHaveBeenCalledWith('setSortType', 1);
    });
  });
});
