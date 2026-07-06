export function verifyOrigin(
  req: Request
){

const origin =
req.headers.get("origin");


if(
process.env.NODE_ENV === "development"
){

return true;

}


return (
origin ===
process.env.NEXT_PUBLIC_APP_URL
);


}