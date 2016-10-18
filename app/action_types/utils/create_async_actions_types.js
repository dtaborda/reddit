/*
* Simple helper for creating async action types.
* For each type provided an object with the request / done / fail
* version is gonna be provided.
*/
export default function createAsyncActionsTypes(types) {
  if (!Array.isArray(types)) {
    throw new Error('Expecting types to be an array of constants');
  }

  const augmentedTypes = {};

  types.forEach((type) => {
    augmentedTypes[type] = {
      rootCode: null,
      code: type,
      request: {
        code: `${type}_Request`,
        rootCode: type
      },
      done: {
        code: `${type}_Done`,
        rootCode: type
      },
      fail: {
        code: `${type}_Fail`,
        rootCode: type
      }
    };
  });

  return augmentedTypes;
}
