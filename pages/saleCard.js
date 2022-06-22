import React from "react";

import { HelmetLayout } from "../src/layouts";
import { SaleCardContainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const SaleCard = () => {
  return (
    <HelmetLayout title="details">
      <SaleCardContainer />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default SaleCard;
