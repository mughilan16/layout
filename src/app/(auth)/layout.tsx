import "../globals.css";
import Auth from "@/components/Auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Auth>
      {children}
    </Auth>
  );
}
