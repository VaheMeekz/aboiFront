import React from "react";

import { HelmetLayout } from "../src/layouts";
import { LoginContainer } from "../src/containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Login = () => {
  return (
    <HelmetLayout title="details">
      <LoginContainer />
    </HelmetLayout>
  );
};
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Login;
