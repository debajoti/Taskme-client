import { Button } from "@/components/ui/button";

export default function Home() {
  return (
   <>
     <div className="flex justify-center items-center h-full mt-36">
      <div className="text-center mt-6">
      <p className="font-jetbrains font-extrabold mb-4 text-xl text-teal-700">A Task Management Application</p>
        <p className="text-6xl sm:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-slate-950 to-slate-600 font-extrabold ">Taskme</p>
        <p className="font-jetbrains w-4/5 sm:w-2/3 xl:w-1/3 text-center mx-auto mt-5">Manage your tasks effortlessly with TaskMe. Organize, track, and complete tasks using a streamlined list view or a dynamic Kanban board. Secure user authentication, real-time updates, and a beautiful UI built with Shadcn. Boost productivity with ease—accessible from anywhere.</p>
        <Button className="mt-5 p-6">Get Started</Button>
      </div>
     </div>
   </>
  );
}
