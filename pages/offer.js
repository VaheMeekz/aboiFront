import React from "react";
import { HelmetLayout } from "../src/layouts";
import { OfferContainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Offer = () => {
  return (
    <HelmetLayout title="details">
      <OfferContainer />
    </HelmetLayout>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
export default Offer;
