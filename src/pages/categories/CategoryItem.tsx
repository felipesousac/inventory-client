import { useNavigate } from "react-router-dom";

interface CategoryItemProps {
  category: {
    id: string;
    categoryName: string;
    description: string;
  };
  url: string;
}

export function CategoryItem({ category, url }: CategoryItemProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(url, { state: category.categoryName })}
      className="shadow-md rounded-md flex flex-col items-center justify-evenly border border-[#12372A] w-9/12 max-w-64 p-5"
    >
      <div className="text-xl">{category.categoryName}</div>
    </button>
  );
}
