"use client";

import { getProductById, updateProductApi } from "@/utils/QueryUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { IUpdateProduct } from "@/utils/type";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const page = ({ params }: ProductPageProps) => {
  const queryClient = useQueryClient();
  const { id } = use(params);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading: isUpdateLoading } = useMutation({
    mutationFn: (newData: IUpdateProduct) => updateProductApi(id, newData),
    onSuccess: () => {
      toast.success("Product updated successfully");
      queryClient.invalidateQueries(["product", id]);
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Failed to update product");
    },
  });

  const onSubmit = (formData: any) => {
    mutate(formData);
    setIsEditing(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading product</div>;

  const product = data?.data;

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="shadow-lg rounded-md">
        <CardContent>
          <h1 className="text-3xl font-bold mb-4  mt-5">
            {isEditing ? "Edit Product" : product?.name}
          </h1>
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register("name")}
                placeholder="Product Name"
                defaultValue={product?.name}
              />
              <Textarea
                {...register("description")}
                placeholder="Product Description"
                defaultValue={product?.description}
              />
              <Input
                type="number"
                {...register("price")}
                placeholder="Price"
                defaultValue={product?.price}
              />
              <h2 className="text-xl font-semibold mt-4">Technical Data</h2>
              <Input
                {...register("case")}
                placeholder="Case Material"
                defaultValue={product?.TechnicalData?.case}
              />
              <Input
                {...register("strap")}
                placeholder="Strap Material"
                defaultValue={product?.TechnicalData?.strap}
              />
              <Input
                {...register("dialColor")}
                placeholder="Dial Color"
                defaultValue={product?.TechnicalData?.dialColor}
              />
              <Input
                {...register("warranty")}
                placeholder="Warranty (years)"
                defaultValue={product?.TechnicalData?.warranty}
                type="number"
              />
              <Input
                {...register("waterResistance")}
                placeholder="Water Resistance"
                defaultValue={product?.TechnicalData?.waterResistance}
              />
              <Input
                {...register("movement")}
                placeholder="Movement"
                defaultValue={product?.TechnicalData?.movement}
              />
              <div className="mt-4 flex flex-col gap-3">
                <h2 className="text-xl font-semibold">Dimensions</h2>
                <Input
                  {...register("diameter")}
                  placeholder="Diameter"
                  defaultValue={product?.TechnicalData?.dimensions?.diameter}
                />
                <Input
                  {...register("length")}
                  placeholder="Length"
                  defaultValue={product?.TechnicalData?.dimensions?.length}
                />
                <Input
                  {...register("thickness")}
                  placeholder="Thickness"
                  defaultValue={product?.TechnicalData?.dimensions?.thickness}
                />
              </div>
              {isUpdateLoading ? (
                <Button disabled>
                  <Loader2 className="animate-spin"></Loader2>
                </Button>
              ) : (
                <Button type="submit">Update Product</Button>
              )}
            </form>
          ) : (
            <>
              <p className="text-gray-700">Price: ${product?.price}</p>
              <p className="text-gray-700">
                Description: {product?.description}
              </p>
              <h2 className="text-xl font-semibold mt-4">Technical Data</h2>
              <ul>
                <li>Case: {product?.TechnicalData?.case}</li>
                <li>Strap: {product?.TechnicalData?.strap}</li>
                <li>Dial Color: {product?.TechnicalData?.dialColor}</li>
                <li>Warranty: {product?.TechnicalData?.warranty} years</li>
                <li>
                  Water Resistance: {product?.TechnicalData?.waterResistance}
                </li>
                <li>Movement: {product?.TechnicalData?.movement}</li>
                <li>Dimensions:</li>
                <ul className="pl-4">
                  <li>
                    Diameter: {product?.TechnicalData?.dimensions?.diameter}
                  </li>
                  <li>Length: {product?.TechnicalData?.dimensions?.length}</li>
                  <li>
                    Thickness: {product?.TechnicalData?.dimensions?.thickness}
                  </li>
                </ul>
              </ul>

              <h2 className="text-xl font-semibold mt-4">Features</h2>
              <ul className="space-y-2">
                {product?.features?.map((feature: any) => (
                  <li key={feature.id} className="text-gray-600">
                    {feature.featName}
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold mt-4">Images</h2>
              {product?.images?.length ? (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {product.images.map((image: any, index: number) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Product image ${index + 1}`}
                      className="object-cover w-full h-32 rounded-md"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No images available</p>
              )}

              <Button onClick={() => setIsEditing(true)} className="mt-4">
                Edit
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
