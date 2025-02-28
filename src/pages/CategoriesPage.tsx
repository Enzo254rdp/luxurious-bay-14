
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CATEGORIES } from "../lib/types";
import { Search, X } from "lucide-react";

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCategories = CATEGORIES.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-enzobay-brown mb-4">Shop by Category</h1>
            <p className="text-enzobay-neutral-600 max-w-2xl mx-auto">
              Browse our wide range of categories to find exactly what you're looking for. From electronics to fashion, we've got you covered.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md mx-auto mt-8">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-enzobay-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white w-full py-3 pl-10 pr-10 rounded-md border border-enzobay-neutral-200 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-enzobay-neutral-400 hover:text-enzobay-neutral-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCategories.map(category => (
                <Link 
                  key={category.id}
                  to={`/products?category=${category.name.toLowerCase()}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group animate-fade-in"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-enzobay-brown group-hover:text-enzobay-orange transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-enzobay-neutral-600 mt-2">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-enzobay-neutral-100 p-4 rounded-full mb-4">
                <Search className="h-8 w-8 text-enzobay-neutral-500" />
              </div>
              <h3 className="text-xl font-semibold text-enzobay-brown mb-2">No categories found</h3>
              <p className="text-enzobay-neutral-600 max-w-md mb-6">
                We couldn't find any categories matching your search. Try a different search term.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="btn-primary"
              >
                Show All Categories
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
