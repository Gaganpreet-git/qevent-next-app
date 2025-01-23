"use client";

import Tag from "@/components/Tag";
import { useEffect, useState } from "react";

export default function TagsPage() {
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    try {
      const response = await fetch("https://qevent-backend.labs.crio.do/tags");
      const data = await response.json();
      console.log(data);
      setTags(data);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center mt-4">
      {tags.map((tag) => (
        <Tag text={tag.name} key={tag.id} />
      ))}
    </div>
  );
}
