"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MediaSection from "./MediaSection";
import { fetchData } from "@/utils/api";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

export default function AllActors({ lang }) {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    const fetchActors = async () => {
      setLoading(true);
      try {
        const data = await fetchData(`/person/popular`, lang, { page: currentPage });
        
        const formattedActors = data.results.map(actor => ({
          id: actor.id,
          title: actor.name,
          imageUrl: actor.profile_path 
            ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
            : '/placeholder-actor.jpg',
          genre: actor.known_for_department,
          additionalInfo: actor.known_for?.map(item => item.title || item.name).join(", ") || "",
          popularity: actor.popularity
        }));

        setActors(formattedActors);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error fetching actors:", err);
        setError(lang === "ar" ? "حدث خطأ في تحميل البيانات" : "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchActors();
  }, [lang, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    router.push(`?page=${newPage}`, { scroll: false });
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Spinner size="xl" />
    </div>
  );

  if (error) return (
    <div className="container mx-auto py-16 text-center">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-2xl mx-auto">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          {lang === "ar" ? "إعادة المحاولة" : "Try Again"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {lang === "ar" ? "الممثلين المشهورين" : "Popular Actors"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {lang === "ar" 
              ? "استكشف قائمة بالممثلين الأكثر شهرة في عالم السينما والتلفزيون"
              : "Explore the most popular actors in the world of cinema and television"}
          </p>
        </div>

        {/* Actors Grid */}
        <MediaSection
          title={lang === "ar" ? "جميع الممثلين" : "All Actors"}
          mediaItems={actors}
          lang={lang}
          isTaged={false}
          type="actors"
          className="mb-12"
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.min(totalPages, 500)} // TMDB limits to 500 pages
              onPageChange={handlePageChange}
              className="shadow-lg rounded-full bg-white dark:bg-gray-800 p-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}