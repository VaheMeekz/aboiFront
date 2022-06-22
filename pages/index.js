import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { HelmetLayout } from "../src/layouts";
import { HomeContainer } from "../src/containers";
const HomePage = (props) => {
  return (
    <>
      <HelmetLayout title="Home">
        <HomeContainer />
      </HelmetLayout>
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default HomePage;
