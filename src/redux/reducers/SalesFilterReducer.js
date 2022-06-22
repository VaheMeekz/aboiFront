import { SALES_FILTER_LOGIC } from "../types";
export const SALES_GET = "SALES_GET";

const initialState = {
  mainData: [],
  filterData: [],
};

export const SaleFilterDataReducer = (state = initialState, action) => {
  switch (action.type) {

    case SALES_GET:

      return {...state, mainData: action.payload}

    case SALES_FILTER_LOGIC:
      let salefiltitem;
      if (action.payload.name == "Անուն(A - Z)") {
        salefiltitem = action.payload.data
          .filter((i) => {
            return i.zexcher;
          })
          .sort(function (a, b) {
            var x = a.categoryNameSales.toLowerCase();
            var y = b.categoryNameSales.toLowerCase();
            if (x < y) {
              return -1;
            }
            if (x > y) {
              return 1;
            }
            return 0;
          });
      } else if (action.payload.name == "Անուն(Z - A)") {
        salefiltitem = action.payload.data
          .filter((i) => {
            return i.zexcher;
          })
          .sort(function (a, b) {
            var x = a.categoryNameSales.toLowerCase();
            var y = b.categoryNameSales.toLowerCase();
            if (y < x) {
              return -1;
            }
            if (y > x) {
              return 1;
            }
            return 0;
          });
      } else if (action.payload.name == "Գին(Ցածր Բարձր)") {
        salefiltitem = action.payload.data
          .filter((i) => {
            return i.zexcher;
          })
          .sort(function (a, b) {
            return a.price - b.price;
          });
      } else if (action.payload.name == "Գին(Բարձր Ցածր)") {
        salefiltitem = action.payload.data
          .filter((i) => {
            return i.zexcher;
          })
          .sort(function (a, b) {
            return b.price - a.price;
          });
      } else if (action.payload.name == "Հիմնական") {
        salefiltitem = action.payload.data.filter((i) => {
          return i.zexcher;
        });
      }

      return { ...state, filterData: salefiltitem };

    default:
      return state;
  }
};
