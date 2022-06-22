import React from "react";
import { HelmetLayout } from "../src/layouts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProfileContainer from "../src/containers/Profile";

const Profile = () => {
    return (
        <HelmetLayout title="details">
            <ProfileContainer />
        </HelmetLayout>
    );
};

export const getStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ["common"])),
    },
});

export default Profile;
