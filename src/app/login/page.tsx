"use client"

import * as React from "react";




import { UserButton, UserProfile } from "@clerk/nextjs"
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Nav from "../components/Nav";
import Footer from "../components/Footer";





function Login() {


  return (
    <div className=" overflow-hidden overflow-y-clip bg-slate-300">

    <Nav/>
    <div className="w-screen h-screen items-center flex flex-col justify-center">
      
      <Card className="w-[450px]">
        <CardHeader>
          <UserButton afterSignOutUrl="/"/>
          <CardTitle className=" underline text-xl">Account Login</CardTitle>
          <CardDescription>Click the button below to make an account or login</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="my-8  items-center flex justify-center"></div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center">
        <Button className="m-4"><Link href="/dashboard">Sign In With Clerk</Link></Button>
        </CardFooter>
      </Card>
    <div className="mt-[10%]">
          <Footer />
    </div>      
    </div>


    </div>
  );
}

export default Login;
