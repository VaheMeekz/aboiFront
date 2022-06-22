import React from "react";

import { HelmetLayout } from "../src/layouts";
import { OrderContainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Order = () => {
  return (
    <HelmetLayout title="details">
      <OrderContainer />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Order;
