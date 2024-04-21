import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import heroImg from "../public/Stress-bro.svg";
import logo from "../public/logo1.png";


export default function MainContent() {
 return (
    <>
  
  <div className="flex flex-col ">
   <main className="flex-1">
    <section className="w-full ">
     <div className="flex flex-col justify-center items-center text-center w-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-200 via-green-200 to-green-300 rounded-xl mb-8 py-2">
      <Image src={logo} width={200} height={200} />
      <h1 className=" text-2xl lg:text-4xl font-extrabold  py-2 px-3 text-muted-foreground tracking-widest">budget buddy</h1>
      <h2 className=" text-md lg:text-lg  pb-2 px-3 text-gray-700/50 ">
       budget. set. simple.
      </h2>
      
     </div>
     <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
       <div className="flex flex-col justify-center space-y-4">
        <div className="space-y-2">
         <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          Take control of your <span className="text-green-100">finances</span>
         </h1>
         <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          Effortlessly track your expenses, create budgets, and gain insights
          into your financial health.
         </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
         <Button asChild>
          <Link className="w-auto" href="/sign-up">
           Sign Up for Free!
          </Link>
         </Button>
         <Button asChild variant="outline" className="bg-green-100">
          <Link className="w-auto" href="/sign-in">
           Learn More
          </Link>
         </Button>
        </div>
       </div>
       <Image
        alt="Hero"
        className="object-cover"
        height="550"
        src={heroImg}
        width="550"
       />
      </div>
     </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
     <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-3 ">
       <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <ActivityIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
        <div className="space-y-2">
         <h3 className="text-xl font-bold">Expense Tracking</h3>
         <p className="text-gray-500 dark:text-gray-400">
          Easily categorize and track all your expenses in one place.
         </p>
        </div>
       </div>
       <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <CalendarIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
        <div className="space-y-2">
         <h3 className="text-xl font-bold">Budget Planning</h3>
         <p className="text-gray-500 dark:text-gray-400">
          Create and manage your budgets with ease.
         </p>
        </div>
       </div>
       <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <BarChart2Icon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
        <div className="space-y-2">
         <h3 className="text-xl font-bold">Financial Reporting</h3>
         <p className="text-gray-500 dark:text-gray-400">
          Generate detailed reports to understand your financial health.
         </p>
        </div>
       </div>
      </div>
     </div>
    </section>
    <section className="w-full py-12 md:py-24 lg:py-32">
     <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
       <div className="space-y-4">
        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
         Testimonials
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
         What our users say
        </h2>
        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
         Hear from real people who have transformed their financial lives with
         our app.
        </p>
       </div>
       <div className="grid gap-4">
        <Card>
         <CardContent className="space-y-4">
          <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal mt-4">
           “This app has been a game-changer for my finances. I never knew where
           my money was going until I started using it.”
          </blockquote>
          <div>
           <div className="font-semibold">Sarah Johnson</div>
           <div className="text-sm text-gray-500 dark:text-gray-400">
            Small Business Owner
           </div>
          </div>
         </CardContent>
        </Card>
        <Card>
         <CardContent className="space-y-4">
          <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal mt-4">
           “This app has helped me stay on top of my budget and reach my
           financial goals. Highly recommended!”
          </blockquote>
          <div>
           <div className="font-semibold">Michael Lee</div>
           <div className="text-sm text-gray-500 dark:text-gray-400">
            Freelance Designer
           </div>
          </div>
         </CardContent>
        </Card>
       </div>
      </div>
     </div>
    </section>
   </main>
  </div>
  </>
 );
}

function ActivityIcon(props) {
 return (
  <svg
   {...props}
   xmlns="http://www.w3.org/2000/svg"
   width="24"
   height="24"
   viewBox="0 0 24 24"
   fill="none"
   stroke="currentColor"
   strokeWidth="2"
   strokeLinecap="round"
   strokeLinejoin="round"
  >
   <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
 );
}

function BarChart2Icon(props) {
 return (
  <svg
   {...props}
   xmlns="http://www.w3.org/2000/svg"
   width="24"
   height="24"
   viewBox="0 0 24 24"
   fill="none"
   stroke="currentColor"
   strokeWidth="2"
   strokeLinecap="round"
   strokeLinejoin="round"
  >
   <line x1="18" x2="18" y1="20" y2="10" />
   <line x1="12" x2="12" y1="20" y2="4" />
   <line x1="6" x2="6" y1="20" y2="14" />
  </svg>
 );
}

function CalendarIcon(props) {
 return (
  <svg
   {...props}
   xmlns="http://www.w3.org/2000/svg"
   width="24"
   height="24"
   viewBox="0 0 24 24"
   fill="none"
   stroke="currentColor"
   strokeWidth="2"
   strokeLinecap="round"
   strokeLinejoin="round"
  >
   <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
   <line x1="16" x2="16" y1="2" y2="6" />
   <line x1="8" x2="8" y1="2" y2="6" />
   <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
 );
}
