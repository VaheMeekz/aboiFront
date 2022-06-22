import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import {HeaderContainer, FooterContainer} from "../../components";
import { BrowserRouter } from 'react-router-dom';

const HelmetLayout = ({children, title, metaDescription}) => (
    <>
        <Head>
            {title && <title>{title}</title>}
            {metaDescription && <meta name="description" content={metaDescription}/>}
            <meta property="og:type" content="website"/>
            <meta name="author" content="Adall"/>
            <meta property="og:site_name" content="adall.ru"/>
            <meta property="og:image" content="/images/metaImage.png"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            <meta property="og:title" content="My page title" key="title"/>
        </Head>
        <HeaderContainer/>
                {children}
        <FooterContainer/>
    </>
);
HelmetLayout.defaultProps = {
    title: "",
    metaDescription: "",
};
HelmetLayout.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any.isRequired,
    metaDescription: PropTypes.string,
};
export default HelmetLayout;
