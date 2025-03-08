
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToPage: (page: number) => void;
  getLocalizedText: (en: string, zh: string) => string;
}

const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  goToPage,
  getLocalizedText
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="py-8 flex justify-between items-center container mx-auto px-4 mb-8">
      <Button 
        variant="outline" 
        onClick={goToPreviousPage} 
        disabled={currentPage <= 1}
        className="flex items-center"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        {getLocalizedText('Previous', '上一页')}
      </Button>
      
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => goToPage(page)}
            className={currentPage === page ? "bg-blue-600" : ""}
          >
            {page}
          </Button>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        onClick={goToNextPage} 
        disabled={currentPage >= totalPages}
        className="flex items-center"
      >
        {getLocalizedText('Next', '下一页')}
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default BlogPagination;
