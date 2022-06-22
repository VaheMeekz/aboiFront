import React, {useEffect, useCallback} from 'react';
import {useRouter} from "next/router";
// import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {HelmetLayout} from "../../../src/layouts";
import {buyserGet} from "../../../src/redux/actions/product.acion";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import ProductContainer from "../../../src/containers/Product/product";

const Category = () => {

    const router = useRouter();

    const {id} = router.query;

    const dispatch = useDispatch()

    const productsMain = useSelector(state => state.buyserReducer.dataMain, shallowEqual);

    useEffect(() => {
        if (id) dispatch(buyserGet({id: id}));
    }, [id])


    return (<>
            <HelmetLayout title="details">
                <ProductContainer productsMain={productsMain.data}/>
            </HelmetLayout>
        </>

    );
};

export default Category;