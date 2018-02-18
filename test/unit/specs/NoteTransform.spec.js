import separateLinksInItem from '@/utils/NoteTransform';

describe('NoteTransform', () => {
  describe('separateLinksInItem', () => {
    it('should be able to handle item without any links', () => {
      const noteItem = { item: {
        item: 'Lives in a hut',
        links: [],
        tags: ['lives', 'in', 'a', 'hut'],
        order: 0,
      }};

      const outputItem = separateLinksInItem(noteItem);
      expect(outputItem.length).toEqual(1);
      expect(outputItem[0]).toEqual({item: 'Lives in a hut'});
    });

    it('should be able to handle last word being link', () => {
      const noteItem = { item: {
        item: 'Lives in Neverwinter',
        links: [{
          toId: 0,
          startWord: 2,
          endWord: 3,
        }],
        tags: ['lives', 'in', 'neverwinter'],
        order: 0,
      }};

      const outputItem = separateLinksInItem(noteItem);
      expect(outputItem.length).toEqual(2);
      expect(outputItem[0]).toEqual({item: 'Lives in'});
      expect(outputItem[1]).toEqual({toId: 0, item: 'Neverwinter'});
    });

    it('should be able to handle middle word being link', () => {
      const noteItem = { item: {
        item: 'Quest given by Bijorn Ironheart to the guild',
        links: [{
          toId: 1,
          startWord: 3,
          endWord: 5,
        }],
        tags: [],
        order: 0,
      }};

      const outputItem = separateLinksInItem(noteItem);
      expect(outputItem.length).toEqual(3);
      expect(outputItem[0]).toEqual({item: 'Quest given by'});
      expect(outputItem[1]).toEqual({toId: 1, item: 'Bijorn Ironheart'});
      expect(outputItem[2]).toEqual({item: 'to the guild'});
    });

    it('should be able to handle the first word being a link', () => {
      const noteItem = { item : {
        item: 'Bijorn Ironheart is awesome',
        links: [{
          toId: 1,
          startWord: 0,
          endWord: 2,
        }],
        tags: [],
        order: 0,
      }};

      const outputItem = separateLinksInItem(noteItem);
      expect(outputItem.length).toEqual(2);
      expect(outputItem[0]).toEqual({toId: 1, item: 'Bijorn Ironheart'});
      expect(outputItem[1]).toEqual({item: 'is awesome'});
    });

    it('should be able to handle the first word being a link', () => {
      const noteItem = { item : {
        item: 'Bijorn Ironheart to Lydia Moonbutt',
        links: [{
          toId: 1,
          startWord: 0,
          endWord: 2,
        }, {
          toId: 2,
          startWord: 3,
          endWord: 5,
        }],
        tags: [],
        order: 0,
      }};

      const outputItem = separateLinksInItem(noteItem);
      expect(outputItem.length).toEqual(3);
      expect(outputItem[0]).toEqual({toId: 1, item: 'Bijorn Ironheart'});
      expect(outputItem[1]).toEqual({item: 'to'});
      expect(outputItem[2]).toEqual({toId: 2, item: 'Lydia Moonbutt'});
    });
  });
});
