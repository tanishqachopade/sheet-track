import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/auth/logout-button";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 border-r p-6">
        <h1 className="font-bold text-xl">
          SheetTrack
        </h1>

        <nav className="mt-10 space-y-4">
          <p>Sheets</p>
          <p>Versions</p>
          <p>Settings</p>
        </nav>
      </aside>


      {/* Main */}
      <main className="flex-1 p-8">

       <div className="flex items-center justify-between">

  <div>
    <h2 className="font-semibold">
      {session.user?.name}
    </h2>

    <p className="text-gray-500">
      {session.user?.email}
    </p>
  </div>


  <LogoutButton />

</div>


        <section className="
          mt-10
          flex
          h-52
          items-center
          justify-center
          rounded-xl
          border
        ">
          <div className="text-center">

            <h3 className="font-semibold">
              No spreadsheets tracked yet
            </h3>

            <p className="mt-4 text-gray-500">
              Connect your first Google Sheet to start version tracking.
            </p>

            <Link
href="/dashboard/connect"
className="
mt-6
inline-block
rounded-lg
bg-black
px-5
py-3
text-white
"
>

Connect Sheet

</Link>
           

          </div>
        </section>

      </main>

    </div>
  );
}