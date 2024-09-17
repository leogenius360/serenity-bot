import { ResourceCard } from "@/components/cards/resource-card";

export default async function LandingPage() {
  return (
    <section className="">
      <h6 className="font-bold">Available Resource</h6>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        {[
          {
            title: "Resource 1",
            category: "category",
            tags: ["tag 1", "tag 2"],
            description: "description",
            imgUrl: "/images/timeflies.png",
          },
          {
            title: "Resource 2",
            category: "category",
            tags: ["tag 1", "tag 2"],
            description: "description",
            imgUrl: "/images/timeflies.png",
          },
          {
            title: "Resource 3",
            category: "category",
            tags: ["tag 1", "tag 2"],
            description: "description",
            // imgUrl: "/images/timeflies.png",
          },
          {
            title: "Resource 4",
            category: "category",
            tags: ["tag 1", "tag 2"],
            description: "description",
            imgUrl: "/images/timeflies.png",
          },
          {
            title: "Resource 5",
            category: "category",
            tags: ["tag 1", "tag 2"],
            description: "description",
            // imgUrl: "/images/timeflies.png",
          },
          {
            title: "Resource 6",
            category: "category",
            tags: ["tag 1", "tag 2"],
            description: "description",
            imgUrl: "/images/timeflies.png",
          },
        ].map((item, idx) => (
          <ResourceCard key={`${item.category} @ ${idx}`} props={item} />
        ))}
      </div>
    </section>
  );
}
