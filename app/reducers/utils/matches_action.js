/*
* Returns true if there is any match, either a sync action
* or the action provided matches one of the sub types of an async action.
* This means that matchesAction(Types.ASYNC_ACTION) will match
* ASYNC_ACTION.request, ASYNC_ACTION.done, ASYNC_ACTION.fail.
*
*/
export default function matchesAction(action, actionTest) {
  if (actionTest.rootCode) {
    if (action.type.code === actionTest.code) {
      return true;
    } else {
      return false;
    }
  }

  if (action.type.code === actionTest.code) {
    return true;
  }

  if (action.type.code === actionTest.request.code) {
    return true;
  }

  if (action.type.code === actionTest.done.code) {
    return true;
  }

  if (action.type.code === actionTest.fail.code) {
    return true;
  }

  return false;
}
