"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

export default function AllNotes() {
  const note = useQuery(api.Notes.query.getAll);

  return (
    <ul>
      {note?.map((noteItem) => (
        <li key={noteItem._id}>
          <a href={`/Note/${noteItem._id}`}>{noteItem.title}</a>
        </li>
      ))}
    </ul>
  );
}
