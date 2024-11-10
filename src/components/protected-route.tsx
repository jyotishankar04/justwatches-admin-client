"use client";

import { fetchSession } from "@/utils/QueryUtils";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading, isSuccess, data, isError } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    onError: () => {
      redirect("/");
    },
  });
  if (isLoading) {
    return (
      <div className="w-full h-screen absolute top-0 left-0">
        <div className="flex justify-center items-center h-full w-full bg-gray-500 opacity-75">
          <Loader2 className="animate-spin"></Loader2>
        </div>
      </div>
    );
  }
  if (isError || !data.success) {
    redirect("/");
  }
  if (isSuccess && data.success) {
    return <>{children}</>;
  }
};

export default ProtectedRoute;
