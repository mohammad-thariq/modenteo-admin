import { getTitleFromPath } from "@/utils/getTitleFromPath";
import Head from "next/head";

export const PageHeader = ({ title }) => {
  const defaultTitle = "Shopo Admin";
  return (
    <Head>
      <title>{getTitleFromPath(title) || defaultTitle}</title>
    </Head>
  );
};
