import { Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import { Metadata } from "next";
import Header from "@/components/header";
import { AuthProvider } from "@/shared/providers/auth-provider";
import ReactQueryProvider from "@/shared/providers/react-query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: 'Торговая площадка "Удачная покупка"',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <Header />
                {children}
                <Footer />
              </SidebarInset>
            </SidebarProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
