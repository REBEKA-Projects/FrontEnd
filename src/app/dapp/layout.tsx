import { Providers } from "./providers";

export default function DappLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Providers>{children}</Providers>;
}
