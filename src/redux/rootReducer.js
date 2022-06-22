import {combineReducers} from "redux";
import {UserOrderReducer} from "./reducers/userOrderReducer";
import {buyserReducer} from "./reducers/productReducer";
import {careerReducer} from "./reducers/careerReducer";
import {HOME_BANER_REDUCER} from "./reducers/HomeSliderBannerReducer";
import {HOME_BEST_SALE} from "./reducers/BestSaleReducre";
import {SPECIAL_OFFER_REDUCER} from "./reducers/SpecialOfferReducer";
import {SaleFilterDataReducer} from "./reducers/SalesFilterReducer";
import {aboutReducer} from "./reducers/aboutReducer";
import {contactReducer} from "./reducers/contactReducer";
import {homeReducer} from "./reducers/homeReducer";
import {offerReducer} from "./reducers/offerReducer";
import {conditionReducer} from "./reducers/conditionReducer";
import {giftCartReducer} from "./reducers/giftCartReducer";
import {deleveryReducer} from "./reducers/deleveryReducer";
import {profileReducer} from "./reducers/profileReducer";
import {SuggestionsReducer} from "./reducers/suggestionsReducer";
import {detailReducer} from "./reducers/detailReducer";
import {couponeReducer} from "./reducers/couponReducer";


export const rootReducer = combineReducers({
    UserOrderReducer,
    buyserReducer,
    careerReducer,
    HOME_BANER_REDUCER,
    HOME_BEST_SALE,
    SPECIAL_OFFER_REDUCER,
    SaleFilterDataReducer,
    aboutReducer,
    contactReducer,
    homeReducer,
    offerReducer,
    conditionReducer,
    giftCartReducer,
    deleveryReducer,
    profileReducer,
    SuggestionsReducer,
    detailReducer,
    couponeReducer
});
