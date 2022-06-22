import React from "react";
import { HelmetLayout } from "../src/layouts";
import ContactContainer from "../src/containers/Contact/contact";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Product = () => {
  return (
    <HelmetLayout title="details">
      <ContactContainer />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
export default Product;
