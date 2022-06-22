import React from "react";
export const PRODUCT_BUYSER = "PRODUCT_BUYSER";
export const PRODUCTSALES_BUYSER = "PRODUCTSALES_BUYSER";
export const PRODUCT_SELECT = "PRODUCT_SELECT";
export const PRODUCT_BASKET = "PRODUCT_BASKET";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DATA_MAIN = "DATA_MAIN";
export const FILTER_DATA_MAIN = "FILTER_DATA_MAIN";
export const PLUS = "PLUS";
export const SEARCH_GET = "SEARCH_GET";

const initialState = {
    dataMain: [],
    buyser: [],
    filtriteritems: undefined,
    buyserSales: [],
    filtriteritemsSales: undefined,
    select: undefined,
    basket: [],
    numberCart: 0,
    name: "",
    category: "",
    test: 'test',
    searchData: []
};

export const buyserReducer = (state = initialState, action) => {
    switch (action.type) {

        case DATA_MAIN:

            return {
                ...state,
                dataMain: action.payload.product,
                category: action.payload.category
            }

        case PLUS:

            return {...state, plusData: action.payload}


        case PRODUCT_BUYSER:
            let x;
            if (action.payload.name === "Ամբողջ Տեսականի") {
                x = action.payload.data;
            } else {
                x = action.payload.data.filter((i) => {
                    return i.categoryType === action.payload.name;
                });
                if (action.payload.categoryNamee) {
                    x = action.payload.data.filter((i) => {
                        return (
                            i.categoryName === action.payload.categoryNamee &&
                            i.categoryType === action.payload.name
                        );
                    });
                }
            }

            return {
                ...state,
                filtriteritems: x,
                buyser: action.payload.data,
                name: action.payload.name,
                category: action.payload.categoryNamee,
            };

        case PRODUCT_SELECT:

        case PRODUCTSALES_BUYSER:
            let y;
            if (action.payload.name === "Ամբողջ Տեսականի") {
                y = action.payload.data;
            } else {
                y = action.payload.data.filter((i) => {
                    return i.categoryTypeSales === action.payload.name;
                });
                if (action.payload.categoryNamee) {
                    y = action.payload.data.filter((i) => {
                        return (
                            i.categoryNameSales === action.payload.categoryNamee &&
                            i.categoryTypeSales === action.payload.name
                        );
                    });
                }
            }

            return {
                ...state,
                filtriteritemsSales: y,
                buyserSales: action.payload.data,
            };

        case SEARCH_GET:

            return {...state, searchData: action.payload}

        default:
            return state;
    }
};
