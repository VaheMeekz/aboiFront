import React from 'react';
import {HelmetLayout} from "../../src/layouts";
import CartContainer from "../../src/containers/Cart";

const Cart = () => {
    return (
        <div>
            <HelmetLayout title="details">
                <CartContainer />
            </HelmetLayout>
        </div>
    );
};

export default Cart;