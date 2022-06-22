import React from "react";

import { HelmetLayout } from "../src/layouts";
import { ServicesContaner } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Services = () => {
  return (
    <HelmetLayout title="details">
      <ServicesContaner />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Services;
