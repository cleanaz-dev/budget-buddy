import React from "react";
import RecieptSummary from "../../../components/RecieptSummary";
import Image from "next/image";
import logo from "../../../public/logo1.png";
import aiImage from "../../../public/ai-amico.png";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
 AtomIcon,
 Brain,
 BrainCircuit,
 DeleteIcon,
 SaveIcon,
} from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import {
 getBudgetBuddyAnalysis,
 getReceiptDataForWebhook,
} from "../../../lib/actions";
import DeleteAnalysis from "../../../components/DeleteAnalysis";
import ArchiveAnalysis from "../../../components/ArchiveAnalysis";

export default async function DataPage() {
 const user = await currentUser();
 const clerkId = user.id;
 const budgetBuddyAnalysis = await getBudgetBuddyAnalysis();

 return (
  <>
   <div className="flex flex-col min-h-[100vh] h-auto justify-center items-center bg-slate-200">
    <Image src={logo} width={100} height={100} alt="logo" priority />
    <h1 className="text-2xl">AI Assistant</h1>

    
    <div>
      <Image src={aiImage} width={200} height={200} alt="ai" priority className="animate-pulse"/>
    </div>
    <RecieptSummary clerkId={clerkId} />
    {budgetBuddyAnalysis
     .filter((analysis) => !analysis.isArchived)
     .map((analysis) => (
      <div key={analysis.id}>
       <div className="justify-center max-w-xl bg-white py-2 px-4 mt-4 rounded-lg">
        <Badge
         variant="primary"
         className="bg-green-100 text-muted-foreground mb-2"
        >
         Budget Buddy Analyis
        </Badge>
        <div className="justify-center max-w-xl bg-slate-50 py-2 px-4 my-4 rounded-lg">
         <div className="flex justify-end">
          <Badge variant="ghost" className="text-muted-foreground">
           {analysis.id}
          </Badge>
         </div>
         <div>
          <h1 className="mb-[-20px] font-bold">Expenses</h1>
          <p style={{ whiteSpace: "pre-wrap" }} className="leading-0">
           {analysis.expenses}
          </p>
         </div>
         <div>
          <h1 className="mb-[-20px] font-bold">Trends</h1>
          <p style={{ whiteSpace: "pre-wrap" }} className="leading-0">
           {analysis.trends}
          </p>
         </div>
         <div>
          <h1 className="mb-[-20px] font-bold">Remaining Budget</h1>
          <p style={{ whiteSpace: "pre-wrap" }} className="leading-0">
           {analysis.remainingBudget}
          </p>
         </div>
         <div>
          <h1 className="mb-[-20px] font-bold">Summary</h1>
          <p style={{ whiteSpace: "pre-wrap" }} className="leading-0">
           {analysis.summary}
          </p>
         </div>
        </div>
        <div className="flex space-x-4 justify-end">
        <ArchiveAnalysis analysisId={analysis.id} />
         <DeleteAnalysis analysisId={analysis.id} />
        </div>
       </div>
      </div>
     ))}
   </div>
  </>
 );
}
