"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CollectionsTable from "./components/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCollection, fetchCollections } from "@/utils/QueryUtils";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Page = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [images, setImages] = useState<File | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["collections"],
    queryFn: fetchCollections,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
    enabled: true,
  });

  const queryClient = useQueryClient();
  const { handleSubmit, register, reset } = useForm();

  const { mutate: createCollectionMutate, isLoading: isCreatingCollection } =
    useMutation({
      mutationFn: createCollection,
      onSuccess: () => {
        toast({
          variant: "default",
          title: "Success",
          description: "Collection created successfully",
          duration: 3000,
        });
        queryClient.invalidateQueries(["collections"]);
        setAddDialogOpen(false);
        reset();
        setImages(null); // Reset images state after submission
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create collection",
          duration: 3000,
        });
      },
    });

  const handleCreateCollection = handleSubmit((data) => {
    if (data.name.trim() === "" || data.description.trim() === "" || !images) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Name, description, and image are required",
        duration: 3000,
      });
      return;
    }
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("collectionImage", images);

    createCollectionMutate(formData);
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen absolute top-0 left-0">
        <div className="flex justify-center items-center h-full w-full bg-gray-500 opacity-75">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading collections
      </div>
    );
  }

  const processFiles = (files: FileList | null) => {
    if (files && files[0]) {
      const imageFile = files[0];
      setImages(imageFile); // Save file to state
    }
  };

  return (
    <div>
      <Card className="w-full h-full rounded-sm">
        <CardHeader className="flex justify-between flex-row items-center">
          <div>
            <CardTitle>Collections</CardTitle>
            <CardDescription>Manage your collections</CardDescription>
          </div>
          <div className="flex gap-2">
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <div>
                  <Button variant="default">Add Collection</Button>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex flex-col gap-5">
                  <DialogTitle className="font-normal ">
                    <h1 className="text-2xl font-bold">Add Collection</h1>
                  </DialogTitle>
                  <DialogDescription className="w-full flex flex-row gap-5">
                    <form
                      onSubmit={handleCreateCollection}
                      className="flex flex-col w-full gap-5"
                    >
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="image">Image</Label>
                        <Input
                          onChange={(e) => processFiles(e.target.files)}
                          type="file"
                          placeholder="Collection image"
                          accept="image/*"
                        />
                      </div>
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          {...register("name")}
                          type="text"
                          placeholder="Collection name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                          {...register("description")}
                          type="text"
                          placeholder="Collection description"
                        />
                      </div>

                      <Button type="submit" disabled={isCreatingCollection}>
                        {isCreatingCollection ? (
                          <span className="flex items-center">
                            <Loader2 className="animate-spin" />
                            <span className="ml-2">Creating...</span>
                          </span>
                        ) : (
                          "Create"
                        )}
                      </Button>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <CollectionsTable collections={data?.data || []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
