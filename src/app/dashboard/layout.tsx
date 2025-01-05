import { Toaster } from "sonner";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { UserProvider } from "@/context/UserContext";
import { ThemeButton } from "@/components/ThemeButton";
import UserAvatar from "../dashboard/components/UserAvatar";
import NavigationMenuHeader from "@/components/NavigationMenuHeader";

interface User {
  id: string;
  name: string;
  role: string;
  password: string;
  imageUrl: string;
}

interface ExtendedSession extends Session {
  token?: {
    token: {
      user?: User;
    };
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: ExtendedSession | null = await auth();
  const user = session?.token?.token?.user;

  if (!session) {
    redirect("/login");
  }

  return (
    <UserProvider user={user}>
      <div>
        <div className="flex w-full justify-between items-center p-5 border-b">
          <div className="flex flex-col justify-center text-center rounded-full border-4 p-2 border-red-600">
            <p className="text-red-600 font-black text-2xl">LOTESUER</p>
          </div>
          <NavigationMenuHeader />
          <div className="flex items-center gap-5">
            <ThemeButton />
            <UserAvatar user={user} />
          </div>
        </div>
        <main className="flex flex-col w-full">{children}</main>
        <Toaster richColors={true} />
      </div>
    </UserProvider>
  );
}
