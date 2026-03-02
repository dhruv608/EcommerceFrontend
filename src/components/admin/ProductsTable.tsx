import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { Product, ProductContent } from "@/lib/types";
import ProductRow from "./ProductRow";
import { PageNotFound } from "./PageNotFound";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export default function ProductsTable({ products, sortBy, direction, onSort
}: {
  products: ProductContent[];
  sortBy: "price" | "stock" | null;
  direction: "asc" | "desc" | null;
  onSort: (field: "price" | "stock") => void
}) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Details</TableHead>
            <TableHead>Category</TableHead>
            <TableHead
              className="cursor-pointer select-none"
              onClick={() => onSort("price")}
            >
              <div className="flex items-center gap-1">
                Price

                {/* Always render icon */}
                <ArrowUpDown
                  size={14}
                  className={
                    sortBy === "price"
                      ? "hidden"
                      : "text-gray-400"
                  }
                />

                <ArrowUp
                  size={14}
                  className={
                    sortBy === "price" && direction === "asc"
                      ? "text-gray-900"
                      : "hidden"
                  }
                />

                <ArrowDown
                  size={14}
                  className={
                    sortBy === "price" && direction === "desc"
                      ? "text-gray-900"
                      : "hidden"
                  }
                />
              </div>
            </TableHead>

            <TableHead
              className="cursor-pointer select-none"
              onClick={() => onSort("stock")}
            >
              <div className="flex items-center gap-1">
                Stock

                {/* Always render icon */}
                <ArrowUpDown
                  size={14}
                  className={
                    sortBy === "stock"
                      ? "hidden"
                      : "text-gray-400"
                  }
                />

                <ArrowUp
                  size={14}
                  className={
                    sortBy === "stock" && direction === "asc"
                      ? "text-gray-900"
                      : "hidden"
                  }
                />

                <ArrowDown
                  size={14}
                  className={
                    sortBy === "stock" && direction === "desc"
                      ? "text-gray-900"
                      : "hidden"
                  }
                />
              </div>
            </TableHead>

            <TableHead>Gallery</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {products.length > 0 ?
            products.map(product => (
              <ProductRow key={product.id} product={product} />
            ))
            : <PageNotFound />}

        </TableBody>
      </Table>
    </div>
  );
}
