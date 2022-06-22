import React, {useEffect} from "react";
import {HelmetLayout} from "../../src/layouts";
import ProductContainer from "../../src/containers/Product/product";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useDispatch, shallowEqual, useSelector} from "react-redux";
import {buyserGet} from "../../src/redux/actions/product.acion";

const Product = () => {

    const productsMain = useSelector(state => state.buyserReducer.dataMain, shallowEqual);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(buyserGet());
    }, [])

    return (
        <HelmetLayout title="details">
            <ProductContainer productsMain={productsMain.data} productPage={productsMain}/>
        </HelmetLayout>
    );
};

export const getStaticProps = async ({locale}) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});

export default Product;
