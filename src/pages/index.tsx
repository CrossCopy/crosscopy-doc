import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import styles from "./index.module.css";
import ContactForm from "../components/ContactForm";

import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import KeyboardIframe from "../components/KeyboardIframe";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <SnackbarProvider maxSnack={3}>
      <Layout
        title={`${siteConfig.title}`}
        description="CrossCopy Documentation"
      >
        <HomepageHeader />
        {/* <KeyboardIframe /> */}
        <main>
          <HomepageFeatures />
          <div className="grid lg:grid-cols-2 md:grid-cols-1">
            <ContactForm />
            <KeyboardIframe />
          </div>
        </main>
      </Layout>
    </SnackbarProvider>
  );
}
