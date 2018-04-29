import gql from 'graphql-tag';

export default gql`
  {
    notes {
      _id
      title
      type
      characterId
      created
      items {
        created
        item
        order
        links {
          toId
          startWord
          endWord
        }
      }
    }
  }
`;
