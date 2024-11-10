import AddProductForm from "../components/AddProductForm";

const page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-start items-center">
      <h1 className="text-2xl font-bold">Add Product</h1>
      <AddProductForm />
    </div>
  );
};

export default page;
