"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProductStore } from "@/store/productStore";

const AddProductDialog = () => {
  const { open, setClose } = useProductStore((state) => state);
  return (
    <Dialog open={true} onOpenChange={setClose}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>Add a new product to your store</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2 grid-cols-2">
            <div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Wrist watch" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" type="text" placeholder="Wrist watch" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" type="number" placeholder="1233" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" type="number" placeholder="10" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" type="text" placeholder="Description" />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input id="image" type="file" placeholder="Image" />
              </div>
            </div>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Add Product
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
