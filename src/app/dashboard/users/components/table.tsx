"use client";
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
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "@/utils/QueryUtils";
import Image from "next/image";

interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  authProvider: string;
  isAdmin: boolean;
  image: string;
}

const UsersTable: React.FC = () => {
  const {
    data: users,
    isLoading: isFetchingUsers,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUserApi,
    initialData: { data: [], success: true },
    refetchOnWindowFocus: false,
    enabled: true,
  });

  if (isFetchingUsers) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              Loading...
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  if (usersError) {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              Error fetching users.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
  console.log(users.data);
  return (
    <Table>
      <TableCaption>List of Custumers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Auth Provider</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.data.length == 0 && (
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center">
              No users found.
            </TableCell>
          </TableRow>
        )}
        {users.data.map((user: IUser) => (
          <TableRow key={user.id} className="items-center">
            <TableCell>
              <Image
                src={user.image}
                alt={user.name}
                width={50}
                height={50}
                className="rounded-full"
              />
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell className="line-clamp-1">{user.email}</TableCell>
            <TableCell>
              {user.authProvider == "google" ? (
                <span className="bg-green-600 px-2 py-1 text-white rounded-full">
                  {user.authProvider}
                </span>
              ) : (
                <span className="bg-black px-2 py-1 text-white rounded-full">
                  {user.authProvider}
                </span>
              )}
            </TableCell>
            <TableCell>
              {user.isAdmin ? (
                <span className="bg-green-600 px-2 py-1 text-white rounded-full">
                  Admin
                </span>
              ) : (
                <span className="bg-red-500 px-2 py-1 text-white rounded-full">
                  User
                </span>
              )}
            </TableCell>
            <TableCell>{getFormattedDate(user.createdAt as string)}</TableCell>
            <TableCell className="flex justify-center items-center w-full h-full">
              Block User will implement
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
