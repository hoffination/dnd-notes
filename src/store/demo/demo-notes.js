export default {
  0: {
    title: 'Neverwinter',
    type: 0,
    id: 0,
    items: [
      {
        item: 'A town in the Sword Coast region',
        links: [],
        tags: ['a', 'town', 'in', 'the', 'sword', 'coast', 'region'],
        order: 0,
      },
    ],
  },
  1: {
    title: 'Bijorn Ironheart',
    type: 1,
    id: 1,
    items: [
      {
        item: 'Lives in Neverwinter',
        links: [
          {
            toId: 0,
            startWord: 2,
            endWord: 3,
          },
        ],
        tags: ['lives', 'in', 'neverwinter'],
        order: 0,
      },
    ],
  },
  2: {
    title: 'Lords Alliance',
    type: 2,
    id: 2,
    items: [
      {
        item:
          'A group of concerned nobles who have combined resources to combat threats to the Sword Coast',
        links: [],
        tags: [],
        order: 0,
      },
      {
        item: 'Northern-most headquarter is located in Neverwinter',
        links: [
          {
            toId: 0,
            startWord: 5,
            endWord: 6,
          },
        ],
        tags: [],
        order: 1,
      },
    ],
  },
  3: {
    title: 'Deliver goods to Phandalin',
    type: 5,
    id: 3,
    items: [
      {
        item: 'Quest given by Bijorn Ironheart in Neverwinter yo',
        links: [
          {
            toId: 1,
            startWord: 3,
            endWord: 5,
          },
          {
            toId: 0,
            startWord: 6,
            endWord: 7,
          },
        ],
        tags: [],
        order: 0,
      },
    ],
  },
  4: {
    title: 'Goblins',
    type: 4,
    id: 4,
    items: [
      {
        item: 'A menace of the forests of the Sword Coast region',
        links: [],
        tags: [],
        order: 0,
      },
    ],
  },
  5: {
    title: 'Delivery to Phandalin',
    type: 3,
    id: 5,
    items: [
      {
        item: 'Loaded on the back of a wagon for delivery to Phandalin',
        links: [],
        tags: [],
        order: 0,
      },
      {
        item: 'From Bijorn Ironheart to Lydia Moonbutt',
        links: [
          {
            toId: 1,
            startWord: 1,
            endWord: 3,
          },
        ],
        tags: [],
        order: 0,
      },
    ],
  },
};
