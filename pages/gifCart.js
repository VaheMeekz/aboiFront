import React from "react";

import { HelmetLayout } from "../src/layouts";
import { GifCardContainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const GIfCard = () => {
  return (
    <HelmetLayout title="details">
      <GifCardContainer />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
export default GIfCard;
