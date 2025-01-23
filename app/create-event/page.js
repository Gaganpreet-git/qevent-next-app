"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MultiSelect } from "react-multi-select-component";
import { v4 as uuidv4 } from "uuid";

function CreatePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [artists, setArtists] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch(
        "https://qevent-backend.labs.crio.do/artists"
      );
      const artistsData = await response.json();
      setArtists(artistsData);
    };

    const fetchTags = async () => {
      const response = await fetch("https://qevent-backend.labs.crio.do/tags");
      const tagsData = await response.json();
      setTags(tagsData.map((tag) => ({ label: tag.name, value: tag.name })));
    };

    Promise.all([fetchArtists(), fetchTags()])
      .then(() => console.log("Data fetched"))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!session) {
      router.replace("/events");
    }
  }, [session, router]);

  const handleEventCreate = async (e) => {
    e.preventDefault();
    const payload = {
      id: uuidv4(),
      name: e.target.elements["name"].value,
      description: e.target.elements["description"].value,
      location: e.target.elements["location"].value,
      date: e.target.elements["date"].value,
      time: e.target.elements["time"].value,
      tags: selectedTags.map((tag) => tag.value),
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      artist: e.target.elements["artist"].value,
      price: e.target.elements["price"].value,
    };

    const response = await fetch("https://qevent-backend.labs.crio.do/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      await response.json();
      router.push("/events", { replace: true });
    } else {
      console.error("Failed to create event");
    }
  };

  return (
    <section className="h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Event</h1>
        <form className="space-y-4" onSubmit={handleEventCreate}>
          <input
            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Event Name"
            type="text"
            name="name"
            required
          />
          <textarea
            rows={4}
            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Event Description"
            name="description"
            required
          />
          <input
            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Event Location"
            type="text"
            name="location"
            required
          />
          <select
            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="artist"
            required
          >
            <option value="">Select Artist</option>
            {artists.map((artist) => (
              <option key={artist.name} value={artist.name}>
                {artist.name}
              </option>
            ))}
          </select>

          <MultiSelect
            options={tags}
            value={selectedTags}
            onChange={setSelectedTags}
            overrideStrings={{
              selectSomeItems: "Select Tags",
              allItemsAreSelected: "All Tags Selected",
              search: "Search Tags...",
              selectAll: "Select All Tags",
            }}
            className="border border-gray-300 rounded-lg"
            isLoading={!tags.length}
          />
          <div className="flex space-x-4">
            <input
              className="flex-1 bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event Date"
              type="date"
              name="date"
              required
            />
            <input
              className="flex-1 bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Event Time"
              type="time"
              name="time"
              required
            />
          </div>
          <input
            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Price (in $)"
            type="number"
            name="price"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Create Event
          </button>
        </form>
      </div>
    </section>
  );
}

export default CreatePage;
