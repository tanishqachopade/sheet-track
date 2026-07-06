import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function SheetPage({
  params,
}: {
  params: Promise<{
    id:string
  }>
}) {

const { id } = await params;


const session =
await auth();



if(!session?.user?.email){

redirect("/");

}



const user =
await prisma.user.findUnique({

  where:{

    email:
    session.user.email,

  },

});



if(!user){

redirect("/");

}



const spreadsheet =
await prisma.spreadsheet.findFirst({

  where:{

    id:id,

    ownerId:
    user.id,

  },


  include:{

    commits:{

      orderBy:{

        createdAt:"desc",

      },


      include:{

        changes:true,

      },

    },

  },

});

  if (!spreadsheet) {
    redirect("/dashboard");
  }



  return (

    <main className="p-8">


      <h1 className="text-3xl font-bold">

        {spreadsheet.title}

      </h1>


      <p className="text-gray-500 mt-2">

        Version History

      </p>



      <div className="mt-10 space-y-6">


        {spreadsheet.commits.map(
          (commit, index) => (

            <div
              key={commit.id}
              className="flex gap-5"
            >


              {/* timeline dot */}

              <div className="flex flex-col items-center">


                <div
                  className="
                  h-4
                  w-4
                  rounded-full
                  bg-blue-500
                  "
                />


                {
                  index !==
                  spreadsheet.commits.length - 1
                  &&
                  (
                    <div
                      className="
                      w-px
                      h-20
                      bg-gray-300
                      "
                    />
                  )
                }


              </div>




              {/* commit card */}


              <div
                className="
                border
                rounded-lg
                p-5
                w-full
                "
              >


                <h2 className="font-semibold">

                  v{
                    spreadsheet.commits.length
                    -
                    index
                  }

                </h2>


                <p className="mt-1">

                  {commit.message}

                </p>



                <p className="text-sm text-gray-500 mt-3">

                  {
                    commit.changes.length
                  }

                  {" "}changes


                </p>



                <p className="text-xs text-gray-400 mt-2">

                  {
                    commit.createdAt
                    .toLocaleString()
                  }


                </p>


              </div>


            </div>

          ))

        }


      </div>


    </main>

  );
}