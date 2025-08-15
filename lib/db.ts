import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
//we added ! to ensure a check mongodb uri can be null or can have a string value as well

if (!MONGODB_URI) {
  throw new Error("Please define mongo_uri in env variables");
}

let cached = global.mongoose;
//connection cached rkhega if already connection hai toh wohi bana lenge warna naya bana lenge

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };
    //promise nhi hai kya? koi nhi bana do fir
    //opts bas tab ke liye jab hum subscribtion plan karne wale hai
    mongoose.connect(MONGODB_URI, opts).then(() => {
      mongoose.connection;
    });
  }
  try {
    //jaise hi promise se value aayegi usse cached ke connection mein rkh denge
    cached.conn = await cached.promise;
  } catch (err) {
    //warna error dedenge or promise ko null rkhenge
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}

//3 cases hai idhar
//connected  line 17-20 mein handle karliya
//not connect line 13-15 mein handle karliya
//promise on the way toh phele line 21-30 mein promise banaya connection request bhej kar
// agar promise hai toh usse cached ke connection mein daaldo warna error return kardo with a null value to the promise
