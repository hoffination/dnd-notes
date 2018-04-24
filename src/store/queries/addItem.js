import gql from 'graphql-tag';

export default gql`
  mutation AddItem($_id: ID!, $item: String!) {
    addItem(_id: $_id, item: $item) {
      _id
      title
      type
      characterId
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
