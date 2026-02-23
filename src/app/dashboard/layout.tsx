import { ReactNode } from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout";
import { AuthGuard } from "@/components/organisms/AuthGuard";

export default function DashboardRootLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </AuthGuard>
    );
}
