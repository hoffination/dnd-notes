import { getters } from '@/store/store';

describe('getters', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = {
      entities: { notes: {} },
      enums: { noteTypes: [] },
      ui: { selectedNote: null },
    };
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
