export function elementReducer(elements, action) {
  switch (action.type) {
    case "ADD_ELEMENT": {
      return [...elements, action.payload];
    }
    case "CHANGE_ELEMENT": {
      return elements?.map((item) => {
        if (item.id === action.payload.id) {
          console.log("inreducer", { ...action.payload });
          return { ...item, ...action.payload };
        } else return item;
      });
    }
  }
}
