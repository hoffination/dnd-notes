import { initialState, getters } from '@/store/store';

describe('getters', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = {
      ...initialState,
    };
  });

  describe('getNote', () => {
    it('should return undefined if id does not exist', () => {
      let getNote = getters.getNote(mockStore);
      expect(getNote('1')).toBeUndefined();
    });

    it('should grab an existing note based on id', () => {
      let noteData = 'TEST';
      let state = { ...mockStore, entities: { notes: { 1: noteData } } };
      let getNote = getters.getNote(state);
      expect(getNote(1)).toEqual(noteData);
    });
  });

  describe('notes', () => {
    it('should get an empty list when notes is empty', () => {
      const emptyList = [];
      const result = getters.notes(mockStore);
      expect(result).toEqual(emptyList);
    });

    it('should be able to get all of the notes as a list', () => {
      const notes = { 1: { id: 1 }, 2: { id: 2 }, 3: { id: 3 } };
      const arrayOfNotes = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const result = getters.notes({
        ...mockStore,
        entities: { ...mockStore.entities, notes },
      });
      expect(result).toEqual(arrayOfNotes);
    });
  });

  describe('notesLoading', () => {
    it('should return true if loading notes', () => {
      const state = {
        ...mockStore,
        loading: ['GET_NOTES'],
      };
      expect(getters.notesLoading(state)).toBeTruthy();
    });

    it('should return false if not loading notes', () => {
      expect(getters.notesLoading(mockStore)).toBeFalsy();
    });
  });

  describe('addItemLoading', () => {
    it('should return true if add items request is loading', () => {
      const state = {
        ...mockStore,
        loading: ['ADD_ITEM'],
      };
      expect(getters.addItemLoading(state)).toBeTruthy();
    });

    it('should return false if add items request is not loading', () => {
      expect(getters.addItemLoading(mockStore)).toBeFalsy();
    });
  });

  describe('addNoteLoading', () => {
    it('should return true if add note request is loading', () => {
      const state = {
        ...mockStore,
        loading: ['ADD_NOTE'],
      };
      expect(getters.addNoteLoading(state)).toBeTruthy();
    });

    it('should return false if add note request is not loading', () => {
      expect(getters.addNoteLoading(mockStore)).toBeFalsy();
    });
  });

  describe('noteTypes', () => {
    it('should be able to get the list of strings representing note types', () => {
      const typeOverride = {
        1: { name: 'Jeff' },
        2: { name: 'Bert' },
        3: { name: 'Eddy' },
      };
      const expected = [{ name: 'Jeff' }, { name: 'Bert' }, { name: 'Eddy' }];
      const result = getters.noteTypes({
        ...mockStore,
        enums: { ...mockStore.enums, noteTypes: typeOverride },
      });
      expect(result).toEqual(expected);
    });
  });

  describe('sortValues', () => {
    it('should return sortValues enum', () => {
      expect(getters.sortValues(mockStore)).toEqual(mockStore.enums.sortValues);
    });
  });

  describe('selectedSortValue', () => {
    it('should grab sort value based on current ui selection', () => {
      expect(getters.selectedSortValue(mockStore)).toEqual('Newest');
    });

    it('should return undefined if sortValue is missing in sortValues', () => {
      const state = { ...mockStore, ui: { notesSortConfig: { sortValue: 1 } } };
      expect(getters.selectedSortValue(state)).toBeUndefined();
    });
  });

  describe('modalOpen', () => {
    it('should return the value of open modal', () => {
      expect(getters.modalOpen(mockStore)).toEqual(
        mockStore.ui.addNoteModalOpen,
      );
    });
  });

  describe('previousNote', () => {
    it('should return null if no previous note', () => {
      expect(getters.previousNote(mockStore)).toBeNull();
    });

    it('should return previous note if it exists', () => {
      const previousNote = { _id: 1 };
      const state = {
        ...mockStore,
        entities: { notes: { 1: previousNote } },
        ui: { previousNote: previousNote._id },
      };
      expect(getters.previousNote(state)).toEqual(previousNote);
    });
  });
});
