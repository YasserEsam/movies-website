"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Import necessary Next.js hooks
import MediaSection from "./MediaSection";
import { fetchData } from "@/utils/api";
import Spinner from "./Spinner"; // Assuming there's a Spinner component for loading
import Pagination from "./Pagination"; // Import the Pagination component

export default function AllActors({ lang }) {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1); // Track total pages for pagination

  const router = useRouter(); // Use router to manipulate the URL
  const searchParams = useSearchParams(); // To get the query params

  // Get the page from the query string, defaulting to 1 if not present
  const pageFromQuery = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(pageFromQuery);

  const fetchAllActors = async (lang, page) => {
    return await fetchData(`/person/popular`, lang, { page });
  };

  useEffect(() => {
    const getActors = async () => {
      setLoading(true);
      try {
        const actorsData = await fetchAllActors(lang, page);
        const formattedActors = actorsData.results.map((actor) => ({
          id: actor.id,
          title: actor.name,
          imageUrl: `https://image.tmdb.org/t/p/w500${actor.profile_path}`,
          genre: actor.known_for_department,
          additionalInfo: "", // No additional info in this case
        }));

        setActors(formattedActors);
        setTotalPages(actorsData.total_pages); // Set total pages for pagination
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error loading data.");
      } finally {
        setLoading(false);
      }
    };

    getActors();
  }, [lang, page]); // Re-fetch actors whenever the language or page changes

  const handlePageChange = (newPage) => {
    setPage(newPage); // Update the local state
    router.push(`?page=${newPage}`); // Update the URL with the new page number
  };

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <MediaSection
        title={lang === "ar" ? "جميع الممثلين" : "All Actors"}
        mediaItems={actors}
        lang={lang}
        isTaged={false}
        type="actors"
      />

      {/* Pagination Section */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
