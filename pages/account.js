import React from "react";

import { HelmetLayout } from "../src/layouts";
import { AccountCntainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Account = () => {
  return (
    <HelmetLayout title="details">
      <AccountCntainer />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
export default Account;
