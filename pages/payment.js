import React from "react";

import { HelmetLayout } from "../src/layouts";
import { PaymentContainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Payment = () => {
  return (
    <HelmetLayout title="details">
      <PaymentContainer />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Payment;
