import React, { useState, DragEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Upload } from "lucide-react";
import Image from "next/image";

interface ImageFile extends File {
  preview?: string;
}

interface ImageUploadProps {
  onImagesChange?: (files: File[]) => void; // Changed to pass files directly
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  maxImages = 5,
}) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const processFiles = (files: FileList | null) => {
    if (files) {
      const newImages: ImageFile[] = Array.from(files)
        .filter((file) => file.type.startsWith("image/"))
        .map((file) => ({
          ...file,
          preview: URL.createObjectURL(file),
        }));

      if (images.length + newImages.length > maxImages) {
        alert(`Maximum ${maxImages} images allowed`);
        return;
      }

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);

      // Call the onImagesChange function to send the files directly
      onImagesChange?.(updatedImages); // Pass the array of files
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (images[index].preview) {
      URL.revokeObjectURL(images[index].preview!);
    }

    // Call the onImagesChange function to update the parent component with the updated file list
    onImagesChange?.(updatedImages);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-start gap-20">
        <Label className="text-sm">
          Images ({images.length}/{maxImages})
        </Label>
        <div
          className={`
            relative
            border border-dashed rounded
            p-1
            w-24
            text-center
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            ${
              images.length >= maxImages
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-50"
            }
          `}
          onDragEnter={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            setIsDragging(false);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => processFiles(e.target.files)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={images.length >= maxImages}
          />
          <Upload className="h-4 w-4 mx-auto" />
          <span className="text-xs">Upload</span>
        </div>
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative w-16 h-16 rounded overflow-hidden border border-gray-200"
            >
              <Image
                width={100}
                height={100}
                src={image.preview as string}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-contain"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-0 right-0 h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-2 w-2" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
