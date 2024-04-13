import { useNavigate } from "react-router-dom";

interface CategoryItemProps {
  category: {
    id: string;
    categoryName: string;
    description: string;
  };
  url: string;
  pageNumber: number;
}

export function CategoryItem({ category, url, pageNumber }: CategoryItemProps) {
  const navigate = useNavigate();

  const obj = {
    categoryName: category.categoryName,
    pageNumber: pageNumber,
  };

  return (
    <button
      onClick={() => navigate(url, { state: obj })}
      className="bg-white shadow-lg rounded-md flex flex-col items-center justify-evenly border border-[#12372A] w-9/12 max-w-64 p-5"
    >
      <div className="text-xl">{category.categoryName}</div>
    </button>
  );
}
