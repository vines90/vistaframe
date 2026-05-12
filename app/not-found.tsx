import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f7fafc]">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-[#1a365d] mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1a202c] mb-4">
          Page Not Found
        </h2>
        <p className="text-[#718096] max-w-md mx-auto mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
          been moved or deleted.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            asChild
            variant="outline"
            className="rounded-sm border-[#1a365d] text-[#1a365d] hover:bg-[#1a365d] hover:text-white"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button
            asChild
            className="rounded-sm bg-[#c05621] hover:bg-[#dd6b20] text-white"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
