import NextAuth, {DefaultSession} from "next-auth";

declare module "next-auth" {
 
  interface Session {
    user: {
      id: string;
    }& DefaultSession["user"];
  }
}


//this file for ts suggestion mil jaye while using next auth agar js mein ho toh koi dikkat nhi hai ts mein important hai it is more like a module file 


//next auth apke liye session create karta hai but we'll also apply jwt
//we created a defaultsession with the help of the user 