import {
  TableRow,
  TableCell,
} from "@/components/ui/table";

export function PageNotFound() {
  return (
    <TableRow>
      <TableCell
        colSpan={8}
        className="text-center py-10 text-gray-500"
      >
        No products found
      </TableCell>
    </TableRow>
  );
}
