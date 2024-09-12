import React from "react";
import logo from "../../../public/logo1.png";
import Image from "next/image";
import {
 Card,
 CardContent,
 CardFooter,
 CardHeader,
} from "../../../components/ui/card";

import { Separator } from "../../../components/ui/separator";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { getUserDetails, updateUserDetails } from "../../../lib/actions";
import { UpdateUserDetailsButton } from "../../../components/SubmitButton";
import { Mail, UserCircle } from "lucide-react";

export default async function userInfo() {
 const user = await currentUser();
 const clerkId = user.id;

 const userDetails = await getUserDetails(clerkId);
 const { name, email, budget, accountType, budgetCycle } = userDetails;

 return (
  <div className="flex flex-col min-h-screen justify-center items-center bg-slate-200">
   <form action={updateUserDetails}>
    <input type="hidden" name="clerkId" value={clerkId} />
    <div className="flex flex-col items-center mb-4 justify-between">
     <Image src={logo} width={100} height={100} alt="logo" priority />
     <h1 className="text-2xl">Settings</h1>
    </div>
    <Card className="w-full max-w-md">
     <CardHeader className="flex  gap-4 p-4">
      {/* <Avatar>
      <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
      <AvatarFallback>JP</AvatarFallback>
     </Avatar> */}
      <div className="space-y-1 ">
       <div className="flex text-lg font-medium gap-2 items-center">
        <UserCircle size={20}/>
        {name}
       </div>
       <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-400 items-center">
        <Mail size={20}/>
        {email}
       </div>
      </div>
     </CardHeader>
     <Separator />
     <CardContent className="p-4">
      <div className="grid gap-4">
       <div className="grid grid-cols-2 gap-4">
        <div>
         <Label htmlFor="budget">Budget</Label>
         <Input defaultValue={budget} id="budget" type="number" name="budget" />
        </div>
        <div>
         <Label htmlFor="timeFrame">Budget Cycle</Label>
         <Select defaultValue={budgetCycle} id="budgetCycle" name="budgetCycle">
          <SelectTrigger>
           <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
           <SelectItem value="Weekly">Weekly</SelectItem>
           <SelectItem value="Monthly">Monthly</SelectItem>
          </SelectContent>
         </Select>
        </div>
       </div>
       <div className="grid grid-cols-2 gap-4">
        <div>
         <Label htmlFor="accountType">Account Type</Label>
         <Select defaultValue={accountType} id="accountType" name="accountType">
          <SelectTrigger>
           <SelectValue placeholder="Select account type" />
          </SelectTrigger>
          <SelectContent>
           <SelectItem value="Personal">Personal</SelectItem>
           <SelectItem value="Work">Work</SelectItem>
          </SelectContent>
         </Select>
        </div>
       </div>
      </div>
     </CardContent>
     <CardFooter className="flex justify-end gap-2 p-4">
      <Button variant="outline">Cancel</Button>
      <UpdateUserDetailsButton />
     </CardFooter>
    </Card>
   </form>
  </div>
 );
}
