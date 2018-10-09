const reducer = (list = [], action) => {
  let isCheked = false;
  let newList = [...list]

  switch (action.type) {

    case 'ADD': {
      return [
        action.item,
        ...list,
      ];
    }

    case 'CHECK': {
      newList.map(item => {
        if (action.zip == item.text) {
          item.checked = !item.checked;
        }
      })
      return newList;
    }

    default: {
      return list;
    }
  }
};

export default reducer;
