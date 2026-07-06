import { google } from "googleapis";


function createClient(accessToken:string){

    const auth = new google.auth.OAuth2();

    auth.setCredentials({
        access_token:accessToken
    });

    return auth;
}



export async function fetchSheetValues(
    spreadsheetId:string,
    accessToken:string
){

    const auth = createClient(accessToken);


    const sheets = google.sheets({
        version:"v4",
        auth
    });


    const response =
    await sheets.spreadsheets.values.get({

        spreadsheetId,

        range:"A:Z"

    });


    return response.data.values;

}

export async function fetchSheetFormulas(
    spreadsheetId:string,
    accessToken:string
){


const auth=createClient(accessToken);


const sheets=google.sheets({
    version:"v4",
    auth
});


const response =
await sheets.spreadsheets.get({

spreadsheetId,

includeGridData:true,

fields:
"sheets(data(rowData(values(userEnteredValue))))"

});


return response.data;

}


export async function fetchMetadata(
 spreadsheetId:string,
 accessToken:string
){

const auth=createClient(accessToken);


const sheets=google.sheets({
version:"v4",
auth
});


const response=
await sheets.spreadsheets.get({
spreadsheetId
});


return {
 title:
 response.data.properties?.title,

 sheets:
 response.data.sheets?.map(
 sheet=>({
 name:
 sheet.properties?.title,

 id:
 sheet.properties?.sheetId
 })
 )
};


}

function getCellAddress(
  row:number,
  col:number
){

let column="";

let n=col;


while(n>=0){

column =
String.fromCharCode(
65 + (n % 26)
)
+
column;


n =
Math.floor(n / 26)-1;

}


return `${column}${row+1}`;

}


export async function fetchSheetSnapshot(
spreadsheetId:string,
accessToken:string
){


const values =
await fetchSheetValues(
spreadsheetId,
accessToken
);


const formulas =
await fetchSheetFormulas(
spreadsheetId,
accessToken
);



const snapshot:
Record<
string,
{
value:string;
formula:string;
}
> = {};



// values
values?.forEach(
(row,rowIndex)=>{


row.forEach(
(cell,colIndex)=>{


const address =
getCellAddress(
rowIndex,
colIndex
);


snapshot[address]={
value:String(cell),
formula:""
};


});


});




// formulas

const rows =
formulas.sheets?.[0]
.data?.[0]
.rowData;


rows?.forEach(
(row,rowIndex)=>{


row.values?.forEach(
(cell,colIndex)=>{


const formula =
cell.userEnteredValue
?.formulaValue;


if(formula){


const address =
getCellAddress(
rowIndex,
colIndex
);


snapshot[address]={

value:
snapshot[address]?.value || "",

formula

};


}


});


});



return snapshot;


}
