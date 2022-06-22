import React from "react";

import { HelmetLayout } from "../src/layouts";
import { AboutContainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const About = () => {
  return (
    <HelmetLayout title="details">
      <AboutContainer />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
export default About;
