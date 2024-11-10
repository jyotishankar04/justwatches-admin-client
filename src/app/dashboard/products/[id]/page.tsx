"use client";

import { getProductById } from "@/utils/QueryUtils";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { use } from "react";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const page = ({ params }: ProductPageProps) => {
  const { id } = use(params);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading product
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found
      </div>
    );
  }

  const product = data.data;

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
        <Link href={"/dashboard/products/edit/" + product.id} className="my-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Edit
          </button>
        </Link>
      </div>
      <p className="text-gray-600 mt-2">{product.description}</p>

      {/* Collection Info */}
      <div className="my-4">
        <h2 className="text-xl font-semibold text-gray-800">Collection</h2>
        <p className="text-gray-600">{product.Collection?.name || "N/A"}</p>
        <p className="text-gray-500 text-sm">
          {product.Collection?.description}
        </p>
      </div>

      {/* Price and ID */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Price</h3>
          <p className="text-gray-600">${product.price}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800">Product ID</h3>
          <p className="text-gray-600">{product.id}</p>
        </div>
      </div>

      {/* Image Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Product Images</h2>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {product.images.length > 0 ? (
            product.images.map((image: { url: string }, index: number) => (
              <img
                key={index}
                src={image.url}
                alt={`Product image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-sm"
              />
            ))
          ) : (
            <p className="text-gray-500">No images available</p>
          )}
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Technical Specifications
        </h2>
        <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-50 p-4 rounded-lg">
          <p>
            <span className="font-semibold">Case:</span>{" "}
            {product.TechnicalData?.case}
          </p>
          <p>
            <span className="font-semibold">Strap:</span>{" "}
            {product.TechnicalData?.strap}
          </p>
          <p>
            <span className="font-semibold">Warranty:</span>{" "}
            {product.TechnicalData?.warranty} year(s)
          </p>
          <p>
            <span className="font-semibold">Dial Color:</span>{" "}
            {product.TechnicalData?.dialColor}
          </p>
          <p>
            <span className="font-semibold">Water Resistance:</span>{" "}
            {product.TechnicalData?.waterResistance}
          </p>
          <p>
            <span className="font-semibold">Movement:</span>{" "}
            {product.TechnicalData?.movement}
          </p>
          <p>
            <span className="font-semibold">Crystal:</span>{" "}
            {product.TechnicalData?.creystal}
          </p>
        </div>
      </div>

      {/* Dimensions */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Dimensions</h2>
        <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
          <p>
            <span className="font-semibold">Diameter:</span>{" "}
            {product.TechnicalData?.dimensions?.diameter} mm
          </p>
          <p>
            <span className="font-semibold">Length:</span>{" "}
            {product.TechnicalData?.dimensions?.length} mm
          </p>
          <p>
            <span className="font-semibold">Thickness:</span>{" "}
            {product.TechnicalData?.dimensions?.thickness} mm
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Features</h2>
        <ul className="list-disc list-inside bg-gray-50 p-4 rounded-lg">
          {product.features.map((feature: any) => (
            <li key={feature.id} className="text-gray-600">
              {feature.featName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
