// client side routing (inside the app)
// <a> routing to outer url
// To add attributes like className, target, rel, etc.
// add them to the <a> tag, not to the <Link> tag.
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";
import Layout from "../../components/layout";

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
        <Script
          src="https://connect.facebook.net/en_US/sdk.js"
          strategy="lazyOnLoad"
          onLoad={() =>
            console.log("Script loaded correctly, window.FB has been populated")
          }
        />
      </Head>
      <h1>First Post</h1>
      <Image src="/images/profile.jpg" width={144} height={144} />
    </Layout>
  );
}
