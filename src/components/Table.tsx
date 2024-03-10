import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableProps extends ComponentProps<"table"> {}

export function Table(props: TableProps) {
  return (
    <table
      {...props}
      className={twMerge(
        "w-11/12 text-sm rounded-md overflow-hidden md:px-4 ",
        props.className
      )}
    />
  );
}

interface TableHeaderProps extends ComponentProps<"thead"> {}

export function TableHeader(props: TableHeaderProps) {
  return <thead {...props} />;
}

interface TableHeadProps extends ComponentProps<"th"> {}

export function TableHead(props: TableHeadProps) {
  return (
    <th
      {...props}
      className={twMerge(
        "text-left py-3 px-4 font-medium text-[#FBFADA] bg-[#436850]",
        props.className
      )}
    />
  );
}

interface TableBodyProps extends ComponentProps<"tbody"> {}

export function TableBody(props: TableBodyProps) {
  return (
    <tbody
      {...props}
      className={twMerge(
        "[&_tr:last-child]:border-0 [&_tr:hover]:bg-slate-300",
        props.className
      )}
    />
  );
}

interface TableRowProps extends ComponentProps<"tr"> {}

export function TableRow(props: TableRowProps) {
  return (
    <tr
      {...props}
      className={twMerge("border-b border-[#12372A] bg-white", props.className)}
    />
  );
}

interface TableCellProps extends ComponentProps<"td"> {}

export function TableCell(props: TableCellProps) {
  return <td {...props} className={twMerge("py-3 px-4", props.className)} />;
}
