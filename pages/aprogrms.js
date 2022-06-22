import React from "react";

import { HelmetLayout } from "../src/layouts";
import { AprogramsContainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Aprograms = () => {
  return (
    <HelmetLayout title="details">
      <AprogramsContainer />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Aprograms;
