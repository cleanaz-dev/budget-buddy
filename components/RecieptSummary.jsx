import React from 'react'


import { getBudgetBuddyAnalysis, getReceiptDataForWebhook } from '../lib/actions'
import { Button } from './ui/button'
import { AtomIcon } from 'lucide-react'
import { ReceiptDataButton } from './SubmitButton'

export default async function RecieptSummary(props) {
  const { clerkId } = props
  
  console.log(clerkId)
 
  return (
    <div>
         <form action={getReceiptDataForWebhook}>
          <input type="hidden" name="clerkId" value={clerkId} />
            <div>
                <ReceiptDataButton />
                
            </div>
            
        </form>
    </div>
  )
}
