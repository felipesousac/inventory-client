import { Link } from "react-router-dom";

interface CategorieItemProps {
  categorie: {
    id: string;
    name: string;
    description: string;
  };
  url: string;
}

export function CategorieItem({ categorie, url }: CategorieItemProps) {
  return (
    <Link
      to={url}
      className="shadow-md rounded-md flex flex-col items-center justify-evenly border border-[#12372A] w-9/12 max-w-64 p-5"
    >
      <div className="text-xl">{categorie.name}</div>
    </Link>
  );
}
