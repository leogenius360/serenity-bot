"use client";

import { SupportButton } from "@/components/buttons";
import { ResourceCard } from "@/components/cards/resource-card";
import { siteConfig } from "@/config/site";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Input,
} from "@nextui-org/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TbFilterSearch } from "react-icons/tb";
import { TiFilter } from "react-icons/ti";
import { CgSortAz } from "react-icons/cg";

export default function ResourcePage() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [categories, setCategories] = useState<string[]>([]);

  const selectedCategoriesString = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  return (
    <>
      <section className="flex justify-between gap-3 mb-6">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              color="primary"
              radius="sm"
              startContent={<TiFilter size={22} className="text-primary" />}
              className="font-bold dark:text-white"
            >
              {selectedCategoriesString
                ? selectedCategoriesString
                : "Filter by category"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filter"
            variant="flat"
            closeOnSelect={false}
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={(keys) => setSelectedKeys(keys as Set<string>)}
          >
            {categories.map((key) => (
              <DropdownItem key={key} className="capitalize">
                {key}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Input
          type="text"
          // value={searchValue}
          // onChange={onSearchEnter}
          placeholder="Search resouce..."
          radius="sm"
          color="primary"
          variant="bordered"
          endContent={<TbFilterSearch size={20} className="text-primary" />}
          className="max-w-96"
          classNames={{
            mainWrapper: "w-full",
            inputWrapper:
              "border-emerald-700 data-[hover=true]:border-primary font-bold",
          }}
        />

        <Dropdown
          placement="bottom-start"
          offset={16}
          crossOffset={-20}
          showArrow
          radius="sm"
          shadow="md"
          // onOpenChange={setIsMenuOpen}
          // isOpen={isMenuOpen}
        >
          <DropdownTrigger>
            <Button
              color="primary"
              radius="sm"
              variant="bordered"
              aria-label="Menu"
              startContent={<CgSortAz size={20} />}
              className="font-bold dark:text-white"
            >
              Order by
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            {siteConfig.navItems.map((item) => (
              <DropdownItem key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </section>
      <section className="">
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
    </>
  );
}
