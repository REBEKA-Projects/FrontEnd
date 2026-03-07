import { ReactNode } from "react";
import { DashboardLayout } from "@/components/templates";
import { AuthGuard } from "@/components/organisms";

export default function DashboardRootLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </AuthGuard>
    );
}
