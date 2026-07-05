export function extractSpreadsheetId(
 url:string
){

const match =
url.match(
/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/
);


if(!match){
throw new Error(
"Invalid Google Sheet URL"
);
}


return match[1];

}
