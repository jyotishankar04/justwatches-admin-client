"use client";

import React from "react";
import ProductsTable from "./components/table";
import { products } from "@/lib/dummyData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/utils/QueryUtils";
import { Loader2 } from "lucide-react";

const Page = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  return (
    <div>
      <Card className="w-full h-full rounded-sm">
        <CardHeader className="flex justify-between flex-row items-center">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products</CardDescription>
          </div>
          <div className="flex gap-2">
            <Link href={"/dashboard/products/add"}>
              <Button variant="default">Add Product</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            isSuccess && <ProductsTable products={data.data} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
