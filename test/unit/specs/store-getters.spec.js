import { getters } from '@/store/store';

describe('getters', () => {
  let mockStore;

  beforeEach(() => {
    mockStore = {
      enums: { noteTypes: [] },
    };
  });

  it('should be able to get the list of strings representing note types', () => {
    const typeOverride = {1: {name: 'Jeff'}, 2: {name: 'Bert'}, 3: {name: 'Eddy'}};
    const expected = ['Jeff', 'Bert', 'Eddy'];

    const result = getters.noteTypes({...mockStore, enums: {...mockStore.enums, noteTypes: typeOverride}});

    expect(result).toEqual(expected);
  });
});
