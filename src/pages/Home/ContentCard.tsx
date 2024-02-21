import { Link } from "react-router-dom";

interface ContentCardProps {
  title: string;
  subtitle: any;
  url: string;
}

export function ContentCard({ title, subtitle, url }: ContentCardProps) {
  return (
    <Link
      to={url}
      className="shadow-md rounded-md flex flex-col items-center justify-evenly border border-pallete-dark w-9/12 max-w-80 h-36"
    >
      <div>{title}</div>
      {subtitle}
    </Link>
  );
}
