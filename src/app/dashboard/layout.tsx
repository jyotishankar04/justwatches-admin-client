import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/protected-route";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <ProtectedRoute>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="flex flex-1 w-full h-screen flex-col">
                {children}
              </div>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </ProtectedRoute>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default layout;
