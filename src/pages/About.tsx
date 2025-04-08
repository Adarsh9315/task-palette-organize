
import { AppHeader } from "@/components/organisms/AppHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Github, CheckSquare, Calendar, CheckCircle } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 max-w-3xl w-full mx-auto">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/">
            <ArrowLeft size={16} className="mr-1" />
            Back to Dashboard
          </Link>
        </Button>
        
        <div className="bg-white p-6 md:p-8 rounded-lg shadow">
          <div className="flex items-center mb-6">
            <CheckSquare size={28} className="text-primary-blue mr-3" />
            <h1 className="text-3xl font-bold">TaskPalette</h1>
          </div>
          
          <p className="mb-6 text-slate-600">
            TaskPalette is a modern task management application built with atomic design principles and React. 
            It helps you organize your work and personal projects with an intuitive and clean interface.
          </p>
          
          <h2 className="text-xl font-semibold mb-3">Key Features</h2>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary-green mr-2 mt-0.5" />
              <span>Create and organize boards for different projects</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary-green mr-2 mt-0.5" />
              <span>Add, edit, and delete tasks within boards</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary-green mr-2 mt-0.5" />
              <span>Categorize tasks by status: To Do, In Progress, and Done</span>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-primary-green mr-2 mt-0.5" />
              <span>Responsive design that works on all devices</span>
            </li>
          </ul>
          
          <h2 className="text-xl font-semibold mb-3">Technologies</h2>
          <ul className="mb-6 space-y-1 text-slate-600">
            <li>• React with TypeScript</li>
            <li>• Recoil for state management</li>
            <li>• Tailwind CSS for styling</li>
            <li>• React Hook Form with Zod for form validation</li>
            <li>• Atomic design principles for component organization</li>
          </ul>
          
          <div className="pt-4 border-t border-slate-200">
            <p className="text-slate-500 text-sm">
              TaskPalette v1.0.0 © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
