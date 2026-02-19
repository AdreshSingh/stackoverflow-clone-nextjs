import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const RightSidebar = () => {
  return (
    <aside className="min-h-screen p-4 w-72 lg:w-80 lg:p-6 bg-gray-50">
      <div className="space-y-4 lg:space-y-6">
        <div className="p-3 border border-yellow-200 rounded bg-yellow-50 lg:p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-800 lg:text-base">
            The Overflow Blog
          </h3>
          <ul className="space-y-2 text-xs lg:text-sm">
            <li className="flex items-start">
              <span className="mr-2 text-gray-400">✏️</span>
              <span className="text-gray-700">A new era of Stack Overflow</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-gray-400">✏️</span>
              <span className="text-gray-700">
                How your favorite movie is changing language learning technology
              </span>
            </li>
          </ul>
        </div>

        <div className="p-3 bg-white border border-gray-200 rounded lg:p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-800 lg:text-base">
            Featured on Meta
          </h3>
          <ul className="space-y-2 text-xs lg:text-sm">
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">💬</span>
              <span className="text-gray-700">
                Results of the June 2025 Community Asks Sprint
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-blue-500">💬</span>
              <span className="text-gray-700">
                Will you help build our new visual identity?
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-gray-400">📋</span>
              <span className="text-gray-700">
                Policy: Generative AI (e.g., ChatGPT) is banned
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-800 lg:text-base">
            Custom Filters
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-blue-600 bg-transparent border-blue-600 hover:bg-blue-50 lg:text-sm"
          >
            Create a custom filter
          </Button>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-gray-800 lg:text-base">
            Watched Tags
          </h3>
          <div className="flex items-center justify-center py-6 lg:py-8">
            <div className="text-center">
              <Eye className="w-10 h-10 mx-auto mb-2 text-gray-300 lg:w-12 lg:h-12" />
              <p className="mb-3 text-xs text-gray-500 lg:text-sm">
                Watch tags to curate your list of questions.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-blue-600 bg-transparent border-blue-600 hover:bg-blue-50 lg:text-sm"
              >
                👁️ Watch a tag
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};