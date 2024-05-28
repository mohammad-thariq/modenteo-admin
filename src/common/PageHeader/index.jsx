import { getTitleFromPath } from "@/utils/getTitleFromPath";
import Head from "next/head";

export const PageHeader = ({ title }) => {
  const defaultTitle = "Shopo Admin";
  return (
    <Head>
      <link rel="icon" href="/assets/img/favicon.ico" sizes="any" />
      <title>{getTitleFromPath(title) || defaultTitle}</title>
    </Head>
  );
};
