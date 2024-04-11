import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/Select";

interface PaginationProps {
  pages: number;
  items: number;
  page: number;
  size: number;
}

export function Pagination({ items, page, pages, size }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function firstPage() {
    setSearchParams((params) => {
      params.set("page", "0");

      return params;
    });
  }

  function previousPage() {
    if (page - 1 < 0) {
      return;
    }

    setSearchParams((params) => {
      params.set("page", String(page - 1));

      return params;
    });
  }

  function nextPage() {
    if (page + 1 > pages) {
      return;
    }

    setSearchParams((params) => {
      params.set("page", String(page + 1));

      return params;
    });
  }

  function lastPage() {
    setSearchParams((params) => {
      params.set("page", String(pages - 1));

      return params;
    });
  }

  function onSelectChange(e: string) {
    setSearchParams((params) => {
      params.set("size", e);

      return params;
    });
  }

  return (
    <div className="w-full md:w-11/12 flex flex-col md:flex-row-reverse text-sm items-center justify-center md:justify-between  mt-2 text-[#12372A]">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>

          <Select defaultValue="10" onValueChange={onSelectChange}>
            <SelectTrigger
              aria-label="Page"
              className=" text-[#FBFADA] bg-[#436850]/70"
            />
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <span>
          Page {page + 1} of {pages}
        </span>

        <div className="space-x-1.5">
          <Button
            className="bg-[#436850]"
            onClick={firstPage}
            size="icon"
            disabled={page - 1 < 0}
          >
            <ChevronsLeft className="size-4 text-[#FBFADA]" />
            <span className="sr-only">First page</span>
          </Button>
          <Button
            className="bg-[#436850]"
            onClick={previousPage}
            size="icon"
            disabled={page - 1 < 0}
          >
            <ChevronLeft className="size-4 text-[#FBFADA]" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            className="bg-[#436850]"
            onClick={nextPage}
            size="icon"
            disabled={page + 1 >= pages}
          >
            <ChevronRight className="size-4 text-[#FBFADA]" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button
            className="bg-[#436850]"
            onClick={lastPage}
            size="icon"
            disabled={page + 1 >= pages}
          >
            <ChevronsRight className="size-4 text-[#FBFADA]" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
      <div className="mt-2">
        Showing {items < 10 ? items : size} of {items} items
      </div>
    </div>
  );
}
