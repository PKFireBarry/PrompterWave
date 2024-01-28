import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { UserButton } from "@clerk/nextjs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

function Nav() {
  return (
    <div className=" sticky h-1/6 w-full m-4 top-4 right-10 flex items-start">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Menu</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle >
              <HoverCard>
                <HoverCardTrigger>
                  <p className="text-3xl underline">Menu</p>
                </HoverCardTrigger>
                <HoverCardContent className="outline text-sm">
                To navigate the website efficiently, utilize the navigation menu by clicking on its options located below
                </HoverCardContent>
              </HoverCard>
            </SheetTitle>
            <UserButton afterSignOutUrl="/" />
          </SheetHeader>
          <div className="grid gap-4 py-8">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-left">
                <a href="/">Home</a>
              </Label>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-left">
                <a href="/about">About</a>
              </Label>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-left">
                <a href="/login">Register</a>
              </Label>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-left">
                <a href="/dashboard">Dashboard</a>
              </Label>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-left">
                <a href="/history">Archive</a>
              </Label>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-left">
                <a href="/profile">Profile</a>
              </Label>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Nav;
