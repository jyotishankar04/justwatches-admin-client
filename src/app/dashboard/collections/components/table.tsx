"use client";

import { Dialog, DialogHeader } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFormattedDate } from "@/utils/TimeConverter";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit2, Eye, Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollectionApi, updateCollectionApi } from "@/utils/QueryUtils";
import { toast } from "@/hooks/use-toast";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface CollectionsTableProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  description: string;
  _count: {
    products: number;
  };
}
const CollectionsTable: React.FC<{
  collections: CollectionsTableProps[];
}> = ({ collections }) => {
  const [collectionToDeleteId, setCollectionToDeleteId] = React.useState<
    string | null
  >(null);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const { handleSubmit, register, reset, setValue } = useForm();

  const queryClient = useQueryClient();

  const { mutate: deleteCollection, isLoading: isDeletingCollection } =
    useMutation({
      mutationFn: deleteCollectionApi,
      onSuccess: () => {
        toast({
          variant: "default",
          title: "Success",
          description: "Collection deleted successfully",
          duration: 3000,
        });
        queryClient.invalidateQueries(["collections"]);
        setCollectionToDeleteId(null); // Close the delete dialog
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete collection",
          duration: 3000,
        });
      },
    });

  const { mutate: updateCollection, isLoading: isUpdatingCollection } =
    useMutation({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutationFn: ({ id, data }: { id: string; data: any }) =>
        updateCollectionApi(id, data),
      onSuccess: () => {
        toast({
          variant: "default",
          title: "Success",
          description: "Collection updated successfully",
          duration: 3000,
        });
        queryClient.invalidateQueries(["collections"]);
        setEditDialogOpen(false);
        reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update collection",
          duration: 3000,
        });
      },
    });

  const handleEditOpen = (collection: CollectionsTableProps) => {
    setValue("id", collection.id);
    setValue("name", collection.name);
    setValue("description", collection.description);
    setEditDialogOpen(true);
  };

  const handleUpdate = handleSubmit((data) => {
    updateCollection({
      id: data.id,
      data: {
        name: data.name,
        description: data.description,
      },
    });
  });

  return (
    <Table>
      <TableCaption>List of Collections.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Total Products</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {collections.map((collection) => (
          <TableRow key={collection.id}>
            <TableCell>
              <Image
                src={collection.image}
                alt={collection.name}
                width={100}
                height={100}
                className="w-10 h-10 object-cover object-center rounded-full"
              />
            </TableCell>
            <TableCell>{collection.name}</TableCell>
            <TableCell className="line-clamp-1">
              {collection.description}
            </TableCell>
            <TableCell>{collection._count.products}</TableCell>
            <TableCell>
              <span className="text-green-600">Available</span>
            </TableCell>
            <TableCell>
              {getFormattedDate(collection.createdAt as string)}
            </TableCell>
            <TableCell className="flex justify-center items-center w-full h-full">
              <div className="flex gap-2">
                <div>
                  <Eye className="h-4 w-4 text-green-600 cursor-pointer" />
                </div>
                <Dialog
                  open={collectionToDeleteId === collection.id}
                  onOpenChange={(open) => {
                    if (open) {
                      setCollectionToDeleteId(collection.id);
                    } else {
                      setCollectionToDeleteId(null);
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Trash className="h-4 w-4 text-rose-700 cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="flex flex-col gap-5">
                      <DialogTitle className="font-normal ">
                        Are you sure you want to delete this {collection.name}{" "}
                        collection?
                      </DialogTitle>
                      <DialogDescription className="w-full flex flex-row gap-5">
                        <Button
                          variant={"secondary"}
                          onClick={() => setCollectionToDeleteId(null)}
                          disabled={isDeletingCollection}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          disabled={isDeletingCollection}
                          onClick={() => {
                            deleteCollection(collection.id);
                          }}
                        >
                          {isDeletingCollection ? (
                            <span className="flex items-center">
                              <Loader2 className="animate-spin" />
                              <span className="ml-2">Deleting...</span>
                            </span>
                          ) : (
                            "Delete"
                          )}
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Edit2
                      className="h-4 w-4 cursor-pointer"
                      onClick={() => handleEditOpen(collection)}
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="flex flex-col gap-5">
                      <DialogTitle className="font-normal">
                        Edit Collection {collection.name}
                      </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="w-full">
                      <form
                        onSubmit={handleUpdate}
                        className="flex flex-col gap-5 w-full"
                      >
                        <Input {...register("id")} type="hidden" />
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="Collection Name"
                            {...register("name")}
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            placeholder="Collection Description"
                            {...register("description")}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isUpdatingCollection}
                        >
                          {isUpdatingCollection ? (
                            <span className="flex items-center">
                              <Loader2 className="animate-spin" />
                              <span className="ml-2">Saving...</span>
                            </span>
                          ) : (
                            "Save"
                          )}
                        </Button>
                      </form>
                    </DialogDescription>
                  </DialogContent>
                </Dialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CollectionsTable;
