import React from "react";

import { auth } from "@clerk/nextjs/server";
import { getAllAnalysisById } from "../../../lib/actions";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardFooter,
 CardTitle,
} from "../../../components/ui/card";
import logo from "../../../public/logo1.png";
import Image from "next/image";
import DeleteAnalysis from "../../../components/DeleteAnalysis";
import { Star } from "lucide-react";

export default async function ArchivePage() {
 const { userId } = auth();
 const analysis = await getAllAnalysisById(userId);

 return (
  <div className="flex flex-col justify-center items-center bg-slate-200 pt-20 gap-4 mb-20">
    <div className="flex flex-col items-center mb-4 justify-between">
     <Image src={logo} width={100} height={100} alt="logo" priority />
     <h1 className="text-2xl">Archive</h1>
     Total: {analysis.length}
    </div>
   
   {analysis.length === 0 && <p>No archived reports found.</p>}
   {analysis.map((item) => (
    <Card key={item.id} className="max-w-3xl px-2 md:px-4 bg-gradient-to-tr from-white to-green-50">
     <CardHeader>
      
      
       <p className="text-xs md:text-base text-right">{new Date(item.createdAt).toLocaleString()}</p>
    
     </CardHeader>
     <CardDescription className="pl-4 pb-2"><span >Archived AI Summary</span></CardDescription>
     <CardContent className="bg-white rounded-lg border-2 border-green-50">
      
      <div className="pt-8">
       <h1 className="mb-[-20px] font-bold">Trends 📈</h1>
       <p style={{ whiteSpace: "pre-wrap" }} className="leading-0">
        {item.trends}
       </p>
      </div>
      <div>
       <h1 className="mb-[-20px] font-bold">Expenses 💸</h1>
       <p style={{ whiteSpace: "pre-wrap" }} className="leading-0">
        {item.expenses}
       </p>
      </div>
      <div>
       <h1 className="mb-[-20px] font-bold">Remaining Budget</h1>
       <p style={{ whiteSpace: "pre-wrap" }} className="leading-0">
        {item.remainingBudget}
       </p>
      </div>
      <div>
       <h1 className="mb-[-20px] pb-10font-bold">Summary 💎</h1>
       <p style={{ whiteSpace: "pre-wrap" }} className="leading-0">
        {item.summary}
       </p>
      </div>
     </CardContent>
     <CardFooter className="flex justify-end mt-4">
      <div >
      <DeleteAnalysis analysisId={item.id} />
      </div>
     </CardFooter>
    </Card>
   ))}
  </div>
 );
}
