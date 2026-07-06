import { auth } from "@/lib/auth";


export default auth((req)=>{


  const isLoggedIn =
    !!req.auth;



  if(!isLoggedIn){


    return Response.redirect(
      new URL(
        "/",
        req.url
      )
    );


  }


});


export const config = {


  matcher:[

    "/dashboard/:path*"

  ]


};