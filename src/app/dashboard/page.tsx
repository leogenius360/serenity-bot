import { Image } from "@nextui-org/react";
import { ShowcaseTab } from "@/components/showcase";
import { Logo } from "@/components/icons";
import { siteConfig } from "@/config/site";

export default function Home() {
  return (
    <>
      <section className="mx-auto px-3">
        <ShowcaseTab />
      </section>

      <section className="pb-12 px-3">
        <div className="max-w-screen-2xl mx-auto">
          <h3 className="font-bold py-3">Current stock overview</h3>

          <div className="flex flex-nowrap gap-3 w-full custom-scrollbar overflow-x-auto scroll-mt-6 snap-x">
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent min-w-64 snap-start drop-shadow-md shadow-inner px-5 py-4 mb-1 lg:mb-2">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="my-12 px-3">
        <div className="max-w-screen-2xl mx-auto my-6 lg:my-8">
          <h3 className="font-bold py-3">About Brainbox Research Institute</h3>

          <div className=" bg-transparent grid sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-3 w-full">
            <div className="card rounded-md bg-transparent w-full px-5 py-4 border-emerald-200 dark:border-default drop-shadow-md shadow-inner">
              <p>
                Brainbox Research Institute (BBRI) is a limited liability
                corporate research organization founded to promote academic and
                perhaps educational, community development, and business
                research activities. Students and research fellows in higher
                education, development organisations, and corporate/business
                entities are among our target audiences.
              </p>
              <p>
                Brainbox Research Institute (BBRI) is a limited liability
                corporate research organization founded to promote academic and
                perhaps educational, community development, and business
                research activities. Students and research fellows in higher
                education, development organisations, and corporate/business
                entities are among our target audiences.
              </p>
            </div>
            <div className="card rounded-md bg-transparent w-full px-5 py-4 border-emerald-200 dark:border-default drop-shadow-md shadow-inner">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
            <div className="card rounded-md bg-transparent w-full px-5 py-4 border-emerald-200 dark:border-default drop-shadow-md shadow-inner">
              <p>
                Our office is currently in Wa, Ghana&apos;s Upper West Region,
                near RST Café and Pet Vero Guest House – Kpaguri residential
                extension area.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl relative rounded-md bg-primary bg-opacity-85 mx-auto shadow-md drop-shadow-lg text-white px-3 my-12 lg:my-16">
        <div className="bg-overlay bg-img-defaulf dark:bg-img-dark"></div>
        <div className="flex flex-wrap justify-around gap-4 px-3 py-6">
          <div className="text-center">
            <h3 className="font-bold">JOURNAL ARTICLES</h3>
            <h3 className="font-bold xl:text-lg">365</h3>
          </div>
          <div className="text-center">
            <h3 className="font-bold">GRANTS RECEIVED</h3>
            <h3 className="font-bold xl:text-lg">$1,736.00</h3>
          </div>
          <div className="text-center">
            <h3 className="font-bold">RESEARCH FELLOWS</h3>
            <h3 className="font-bold xl:text-lg">167</h3>
          </div>
        </div>
      </section>
    </>
  );
}
