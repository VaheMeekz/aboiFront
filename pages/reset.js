import React from "react";
import { HelmetLayout } from "../src/layouts";
import { ResetContainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Reset = () => {
  return (
    <HelmetLayout title="details">
      <ResetContainer />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Reset;
