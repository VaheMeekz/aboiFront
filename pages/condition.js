import React from "react";
import { HelmetLayout } from "../src/layouts";
import { ConditionContainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Condition = () => {
  return (
    <HelmetLayout title="details">
      <ConditionContainer />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Condition;
