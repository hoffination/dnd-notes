import { initialState, mutations } from '@/store/store';

describe('mutations', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = { ...initialState };
  });

  describe('openAddNoteModal', () => {
    it('should set addNoteModalOpen to true', () => {
      mutations.openAddNoteModal(mockStore);
      expect(mockStore.ui.addNoteModalOpen).toEqual(true);
    });
  });

  describe('closeAddNoteModal', () => {
    it('should set addNoteModalOpen to true', () => {
      mutations.closeAddNoteModal(mockStore);
      expect(mockStore.ui.addNoteModalOpen).toEqual(false);
    });
  });

  describe('loadNotes', () => {
    it('should set notes as the second value', () => {
      mutations.loadNotes(mockStore, { a: 1 });
      expect(mockStore.entities.notes).toEqual({ a: 1 });
    });
  });

  describe('appendNotes', () => {
    it('should append notes to existing notes object', () => {
      mockStore.entities.notes.b = 2;
      mutations.appendNotes(mockStore, { a: 1 });
      expect(mockStore.entities.notes).toEqual({ a: 1, b: 2 });
    });
  });

  describe('setPreviousNote', () => {
    it('should set previous note as the second value', () => {
      mutations.setPreviousNote(mockStore, 123);
      expect(mockStore.ui.previousNote).toEqual(123);
    });
  });

  describe('resetPreviousNote', () => {
    it('should reset previous note to null', () => {
      mockStore.ui.previousNote = 2;
      mutations.resetPreviousNote(mockStore);
      expect(mockStore.ui.previousNote).toEqual(null);
    });
  });

  describe('startLoading', () => {
    it('should add item to loading queue', () => {
      mockStore.loading = [1];
      mutations.startLoading(mockStore, 'monsters');
      expect(mockStore.loading).toEqual([1, 'monsters']);
    });
  });

  describe('endLoading', () => {
    it('should remove first item to loading queue with given value', () => {
      mockStore.loading = [1, 'monsters', 2];
      mutations.endLoading(mockStore, 'monsters');
      expect(mockStore.loading).toEqual([1, 2]);
    });

    it('should not remove anything if it cannot find the item', () => {
      mockStore.loading = [1, 2];
      mutations.endLoading(mockStore, 'monsters');
      expect(mockStore.loading).toEqual([1, 2]);
    });

    it('should only remove the first one if it finds duplicates', () => {
      mockStore.loading = [1, 'monsters', 2, 'monsters'];
      mutations.endLoading(mockStore, 'monsters');
      expect(mockStore.loading).toEqual([1, 2, 'monsters']);
    });
  });

  describe('setSortType', () => {
    it('should set the sortValue to the passed value', () => {
      mutations.setSortType(mockStore, 'random');
      expect(mockStore.ui.notesSortConfig.sortValue).toEqual('random');
    });
  });
});
