"use client";

import { useState } from "react";


export default function ConnectPage() {


  const [url, setUrl] = useState("");

  const [result, setResult] =
    useState<any>(null);


  async function connect() {


    console.log(
      "BUTTON CLICKED"
    );


    const res =
      await fetch(
        "/api/sheets/connect",
        {

          method: "POST",

          headers: {
            "Content-Type":
            "application/json",
          },


          body:
          JSON.stringify({
            url
          }),

        }
      );



    const data =
      await res.json();



    console.log(
      "RESPONSE:",
      data
    );



    setResult(data);


  }



  return (

    <div className="p-10">


      <h1 className="text-xl font-bold">

        Connect Google Sheet

      </h1>



      <input

        className="
        mt-5
        w-full
        rounded
        border
        p-3
        "


        value={url}


        onChange={
          (e)=>
          setUrl(
            e.target.value
          )
        }


        placeholder=
        "Paste Google Sheet URL"

      />



      <button

        onClick={connect}

        className="
        mt-5
        rounded
        bg-black
        px-5
        py-3
        text-white
        "

      >

        Connect Sheet

      </button>



      {
        result && (

          <div
            className="
            mt-8
            rounded-xl
            border
            p-5
            "
          >


            <h2
            className="
            font-bold
            text-green-600
            "
            >

              Connected Successfully ✓

            </h2>



            <p className="mt-3">

              Sheet:
              {" "}
              {result.metadata.title}

            </p>



            <p>

              Tabs:
              {" "}
              {result.metadata.sheets.length}

            </p>



            <p>

              Cells tracked:
              {" "}
              {
              Object.keys(
                result.snapshot
              ).length
              }

            </p>


          </div>

        )
      }


    </div>

  );


}