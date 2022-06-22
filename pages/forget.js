import React from "react";

import { HelmetLayout } from "../src/layouts";
import { ForgetContainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const HomePage = () => (
  <>
    <HelmetLayout title="details">
      <ForgetContainer />
    </HelmetLayout>
  </>
);
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default HomePage;
