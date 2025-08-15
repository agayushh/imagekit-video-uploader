import { Connection } from "mongoose";

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

export {};


//global bas declare hota hai export nhi 
//mongoose variable add kiya jismein we are expecting 2 values ==> connection and promise of type connection 