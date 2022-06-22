import React from "react";
import { HelmetLayout } from "../../src/layouts";
import SalesContainer from "../../src/containers/Sales";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Detail = () => {
    return (
        <>
            <HelmetLayout title="details">
                <SalesContainer />
            </HelmetLayout>
        </>
    );
};
export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});
export default Detail;
