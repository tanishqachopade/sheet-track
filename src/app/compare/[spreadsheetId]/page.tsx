import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import CompareSelector from "./CompareSelector";

export default async function ComparePage({
  params,
  searchParams,
}: {
  params: Promise<{
    spreadsheetId: string;
  }>;
  searchParams: Promise<{
    from?: string;
    to?: string;
  }>;
}) {
  const { spreadsheetId } = await params;

  const { from, to } = await searchParams;

  const spreadsheet =
    await prisma.spreadsheet.findUnique({

      where: {
  id: spreadsheetId,
},

      include: {
        commits: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

  if (!spreadsheet) {
    return notFound();
  }

  const fromCommit = from
    ? await prisma.commit.findUnique({
        where: {
          id: from,
        },

        include: {
          snapshot: true,
          changes: true,
        },
      })
    : null;

  const toCommit = to
    ? await prisma.commit.findUnique({
        where: {
          id: to,
        },

        include: {
          snapshot: true,
          changes: true,
        },
      })
    : null;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">
        Compare Versions
      </h1>

      <p className="mt-2 text-gray-500">
        {spreadsheet.title}
      </p>

      <CompareSelector
  sheetId={spreadsheet.id}
  commits={spreadsheet.commits}
/>

    {toCommit && (
  <div className="mt-8">
    <h2 className="text-xl font-bold mb-4">
      Differences
    </h2>

    <div className="space-y-4">

      {toCommit.changes.map((change) => (

        <div
          key={change.id}
          className="border rounded p-4"
        >

          <p className="font-semibold">
            {change.cell}
          </p>

          <p className="text-red-600">
            - {change.oldValue}
          </p>

          <p className="text-green-600">
            + {change.newValue}
          </p>

        </div>

      ))}

    </div>
  </div>
)}

      <div className="mt-10 space-y-4">
        {spreadsheet.commits.map(
          (commit, index) => (
            <div
              key={commit.id}
              className="border rounded p-5"
            >
              <h2 className="font-semibold">
                v{index + 1}
              </h2>

              <p>
                {commit.message}
              </p>

              <p className="text-sm text-gray-500">
                {commit.createdAt.toLocaleString()}
              </p>
            </div>
          )
        )}
      </div>
    </main>
  );
}