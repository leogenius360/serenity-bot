import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import { Message } from "../forms/chat-input";
import { IoIosHeart } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";

interface ResourceCardProps {
  title: string;
  category: string;
  tags: string[];
  description: string;
  imgUrl?: string;
}

export const ResourceCard = ({ props }: { props: ResourceCardProps }) => {
  return (
    <Card
      radius="sm"
      className="w-full h-full border border-emerald-400 dark:border-default shadow-md"
    >
      <CardHeader className="justify-between ">
        <h6 className="font-bold text-sm">{props.category}</h6>
        <div className="flex gap-1">
          {props.tags.map((tag, idx) => (
            <Chip
              key={`tag-${idx}`}
              size="sm"
              radius="sm"
              color="primary"
              variant="dot"
              className="font-bold"
            >
              {tag}
            </Chip>
          ))}
        </div>
      </CardHeader>
      <CardBody className="py-0">
        {props.imgUrl && (
          <Image
            src={props.imgUrl}
            alt={props.imgUrl}
            radius="sm"
            className=""
            classNames={{
              wrapper: "overflow-hidden h-16 mb-2",
              img: "w-full object-cover",
            }}
          />
        )}
        <Button
          as={Link}
          href={`resources/${props.title}/details`}
          size="sm"
          radius="sm"
          color="primary"
          variant="light"
          className="w-full font-bold border-b border-primary mb-2 dark:text-white"
        >
          {props.title}
        </Button>
        <Message msg={props.description} className="px-2 md:px-2" />
      </CardBody>
      <CardFooter className="justify-between gap-3 mt-auto">
        <Button
          as={Link}
          href={`resources/${props.title}/details`}
          size="sm"
          color="primary"
          variant="ghost"
          className="w-1/3 dark:text-white"
        >
          View details
        </Button>
        <div className="flex flex-nowrap gap-2">
          <Button
            as={Link}
            href={`resources/${props.title}/details`}
            isIconOnly
            size="sm"
            // radius=""
            color="primary"
            variant="ghost"
            startContent={<IoIosHeart size={16} />}
            className="dark:text-white"
          ></Button>
          <Button
            as={Link}
            href={`resources/${props.title}/details`}
            isIconOnly
            size="sm"
            // radius=""
            color="primary"
            variant="ghost"
            startContent={<FiMoreVertical size={16} />}
            className="dark:text-white"
          ></Button>
        </div>
      </CardFooter>
    </Card>
  );
};
