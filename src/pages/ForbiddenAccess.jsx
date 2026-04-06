import { TriangleAlert } from "lucide-react";

const ForbiddenAccess = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 flex justify-center text-accent">
          <TriangleAlert size={60} />
        </div>
        <h1 className="text-2xl font-bold">Forbidden Access</h1>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default ForbiddenAccess;
