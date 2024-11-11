import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersTable from "./components/table";

const Page = () => {
  return (
    <div>
      <Card className="w-full h-full rounded-sm">
        <CardHeader className="flex justify-between flex-row items-center">
          <div>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage Users</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <UsersTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
