import React from 'react';
import {HelmetLayout} from "../../src/layouts";
import CareerContainer from "../../src/containers/Career/career";

const Career = () => {
    return (
        <div>
            <HelmetLayout title="details">
                <CareerContainer />
            </HelmetLayout>
        </div>
    );
};

export default Career;