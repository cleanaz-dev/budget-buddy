import React from 'react'

import { Button } from './ui/button';
import {   
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, 
} from './ui/dialog';
import { deleteSingleAnalysis } from '../lib/actions';
import { Input } from './ui/input';
import { DeleteAnalysisButton } from './SubmitButton';
  

export default function DeleteAnalysis({analysisId}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="submit"
            className="bg-red-100 text-muted-foreground hover:bg-transparent hover:text-red-500"
          >
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Delete Analysis</DialogTitle>
            <DialogDescription>
              <div className="space-y-2">
                <h1>Are you sure you want to delete this? It cannot be recovered once deleted.</h1>
                <p className="font-semibold">{analysisId}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <form action={deleteSingleAnalysis}>
            <Input
              name="analysisId"
              value={analysisId}
              className="col-span-3 border-none"
              type="hidden"
            />

            <DialogFooter>
              <DialogClose>
                <DeleteAnalysisButton />
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>

  )
}
