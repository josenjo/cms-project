import Head from "next/head";

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";
import Breadcrumb from "@/components/layouts/Breadcrumb";
import SettingsContent from "@/components/contents/SettingContent";

export default function SettingsPage() {
  return (
    <>
      <Head>
        <title>CMS Project</title>
        <meta name="description" content="This is CMS Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-1">
        {/* <Sidebar /> */}

        <div className="flex-1 flex flex-col transition-all duration-200 ease-in-out">
            {/* <Header /> */}

            <main className="flex-1 p-6 overflow-y-auto">
                <Breadcrumb title="Settings" link="/" />
                <SettingsContent />
            </main>

            {/* <Footer /> */}
        </div>
      </div>
    </>
  );
}
