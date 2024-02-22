import { Link } from "react-router-dom";

interface CategoryItemProps {
  category: {
    id: string;
    name: string;
    description: string;
  };
  url: string;
}

export function CategoryItem({ category, url }: CategoryItemProps) {
  return (
    <Link
      to={url}
      className="shadow-md rounded-md flex flex-col items-center justify-evenly border border-[#12372A] w-9/12 max-w-64 p-5"
    >
      <div className="text-xl">{category.name}</div>
    </Link>
  );
}
