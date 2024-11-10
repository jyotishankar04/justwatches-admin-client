"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import FeatureList from "./FeatCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct, fetchCollections } from "@/utils/QueryUtils";
import { ICollection } from "@/utils/type";
import ImageUpload from "./ImageDropZone";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { productAddValidator } from "@/utils/zodValidator";
import toast from "react-hot-toast";

const AddProductForm = () => {
  let features: string[] = [];

  const { mutate, isLoading: isCreateLoading } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product created successfully");

      reset();
    },
    onError: () => {
      toast.error("Failed to create product");
    },
  });

  const { register, handleSubmit, reset, setValue } = useForm();

  const { data: collections, isLoading: isCollectionLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollections,
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

  const handleCreateProduct = handleSubmit((data) => {
    const validate = productAddValidator.safeParse(data);

    if (!validate.success) {
      // Display the first validation error
      toast.error(
        validate.error.issues[0]?.message || "Validation error occurred"
      );
      return;
    }
    mutate({
      name: data.name,
      collectionId: data.collectionId,
      price: data.price,
      description: data.description,
      features: data.features,
      case: data.case,
      strap: data.strap,
      warranty: data.warranty,
      dialColor: data.dialColor,
      waterResistance: data.waterResistance,
      movement: data.movement,
      crystal: data.crystal,
      diameter: data.diameter,
      length: data.length,
      thickness: data.thickness,
    });
  });

  return (
    <form
      onSubmit={handleCreateProduct}
      className="w-full h-fit grid gap-5 p-5 grid-cols-2"
    >
      <div className="w-full h-fit">
        <Label>Name</Label>
        <Input
          {...register("name")}
          placeholder="Product Name"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Price</Label>
        <Input
          {...register("price")}
          placeholder="e.g: 100"
          className="w-full"
          type="number"
        />
      </div>
      <div className="w-full h-fit row-span-2">
        <Label>Description</Label>
        <Textarea
          {...register("description")}
          placeholder="Product Description"
          className="w-full max-h-64 min-h-64"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Images</Label>
        <ImageUpload />
      </div>
      <div className="w-full h-fit">
        <Label>Collection</Label>
        {isCollectionLoading ? (
          <div className="w-full h-10 flex justify-center items-center">
            <Loader2 className="animate-spin"></Loader2>
          </div>
        ) : (
          <Select onValueChange={(e) => setValue("collectionId", e)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Collection" />
            </SelectTrigger>
            <SelectContent>
              {collections?.data?.map((collection: ICollection) => (
                <SelectItem key={collection.id} value={collection.id}>
                  {collection.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold">Technical Data</h1>
      </div>
      <div className="w-full h-fit">
        <Label>Case</Label>
        <Input
          {...register("case")}
          placeholder="Case"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Strap</Label>
        <Input
          {...register("strap")}
          placeholder="Strap"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Warranty</Label>
        <Input
          {...register("warranty")}
          placeholder="Warranty"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Dial Color</Label>
        <Input
          {...register("dialColor")}
          placeholder="Dial Color"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Water Resistance</Label>
        <Input
          {...register("waterResistance")}
          placeholder="Water Resistance"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Log Width</Label>
        <Input
          {...register("logWidth")}
          placeholder="Log Width"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Crystal</Label>
        <Input
          {...register("crystal")}
          placeholder="Crystal"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Length</Label>
        <Input
          {...register("length")}
          placeholder="Length"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Thickness</Label>
        <Input
          {...register("thickness")}
          placeholder="Thickness"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Diameter</Label>
        <Input
          {...register("diameter")}
          placeholder="Diameter"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit">
        <Label>Movement</Label>
        <Input
          {...register("movement")}
          placeholder="Movement"
          className="w-full"
          type="text"
        />
      </div>
      <div className="w-full h-fit col-span-2">
        <FeatureList
          onFeaturesChange={(e) => {
            features = e.map((f) => f.name);
            setValue("features", features);
          }}
          maxFeatures={6}
        />
      </div>
      <div className="w-full h-fit mb-20 col-span-2">
        {isCreateLoading ? (
          <div className="w-full h-10 flex justify-center items-center">
            <Loader2 className="animate-spin"></Loader2>
          </div>
        ) : (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddProductForm;
