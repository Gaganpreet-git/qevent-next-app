'use client'

import React, { useState, useEffect, Suspense } from "react";
import EventCard from "@/components/EventCard";
import { useSearchParams } from "next/navigation";

function EventPage() {
  const searchParams = useSearchParams();
  const tagQuery = searchParams.get('tag');
  const artistQuery = searchParams.get('artist');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetch("https://qevent-backend.labs.crio.do/events");
      const eventData = await data.json();

      let filteredEvents = [];

      if (tagQuery) {
        filteredEvents = eventData.filter(event => event.tags && event.tags.includes(tagQuery));
      } else if (artistQuery) {
        filteredEvents = eventData.filter(event => event.artist && event.artist.toLowerCase() === artistQuery.toLowerCase());
      } else {
        filteredEvents = eventData;
      }

      setEvents(filteredEvents);
    };

    fetchEvents();
  }, [tagQuery, artistQuery]); 

  return (
    <div className="h-full w-full flex-wrap flex items-center justify-around mt-8 mb-32">
      {events && events.map((eventData) => (
        <EventCard key={eventData.id} eventData={eventData} />
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventPage />
    </Suspense>
  );
}
