import { generateDiff } from "./core/diff";


const oldSnapshot = {

 cells: {

  A1: {
   value: "Revenue",
   formula: null
  },


  B1: {
   value: "100",
   formula: null
  }

 },


 rows: [

  ["Revenue", "100"],

  ["Cost", "50"]

 ]

};



const newSnapshot = {


 cells: {


  A1: {
   value: " Revenue ",
   formula: null
  },


  B1: {
   value: 100,
   formula: null
  },


  C1: {

   value: "Profit",

   formula: "=B1-B2"

  }

 },


 rows: [

  ["Cost", 50],

  ["Revenue", 100]

 ]

};



console.log(

 JSON.stringify(

  generateDiff(
   oldSnapshot,
   newSnapshot
  ),

  null,

  2

 )

);