import { Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/footer";
import { Metadata } from "next";
import Header from "@/components/header";
import { AuthProvider } from "@/shared/providers/auth-provider";
import ReactQueryProvider from "@/shared/providers/react-query-provider";
import { ThemeProvider } from "@/shared/providers/theme-provider";
import { ToastProvider } from "@/shared/providers/toast-provider";

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
  metadataBase: new URL("https://lp-web.fly0utwest.dev/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <ThemeProvider enableSystem attribute={"class"} defaultTheme="system">
            <ToastProvider>
              <AuthProvider>
                <SidebarProvider defaultOpen={false}>
                  <AppSidebar />
                  <SidebarInset>
                    <Header />
                    <main className="flex flex-1 flex-col gap-8 p-4 md:gap-16 md:p-8 min-h-svh">
                      {children}
                    </main>
                    <Footer />
                  </SidebarInset>
                </SidebarProvider>
              </AuthProvider>
            </ToastProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
