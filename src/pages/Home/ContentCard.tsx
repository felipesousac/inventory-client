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
      className="shadow-md flex flex-col items-center justify-evenly border border-[#12372A] w-9/12 h-36"
    >
      <div>{title}</div>
      {subtitle}
    </Link>
  );
}
