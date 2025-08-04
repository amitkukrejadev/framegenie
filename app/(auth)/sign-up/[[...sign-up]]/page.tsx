import { SignUp } from "@clerk/nextjs";

export default function Page() {
   return (
     <div className="min-h-screen flex items-center justify-center bg-gray-700">
       <div className="w-full max-w-md p-6">
         <SignUp />
       </div>
     </div>
   );
 } 
 