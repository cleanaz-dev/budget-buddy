import { Input } from "postcss";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function UploadFile() {
    return (
      (<Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload a File</CardTitle>
          <CardDescription>Drag and drop a file or click the button to select a file to upload.
            
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="">
            {/* <div
              className="flex h-24 items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-gray-400 dark:border-gray-700 dark:bg-gray-900">
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">Drag and drop a file</div>
            </div> */}
          
              
              
             
              <Input id="picture" type="file" />
          
            
          </div>
        </CardContent>
      </Card>)
    );
  }
  
  function UploadIcon(props) {
    return (
      (<svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
      </svg>)
    );
  }