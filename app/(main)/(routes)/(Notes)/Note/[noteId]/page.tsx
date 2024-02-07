"use client";

import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { BlockEditor } from "../../../../../components/BlockEditor";
// import { NoteEditor } from "@/components/NoteEditor";
// import { NoteTitleEditor } from "@/components/NoteTitleEditor";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import { useQuery } from "convex/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";

import * as Y from "yjs";

interface NoteIdPageProps {
  params: {
    noteId: Id<"notes">;
  };
}

export default function NotePage({ params }: NoteIdPageProps) {
  const note = useQuery(api.Notes.query.getById, {
    noteId: params.noteId,
  });

  //!TipTap stuff ****
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const searchParams = useSearchParams();
  const hasCollab = parseInt(searchParams.get("noCollab") as string) !== 1;

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch("/api/collaboration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();

      const { token } = data;

      // set state when the data received
      setCollabToken(token);
    };

    dataFetch();
  }, []);

  //! ****

  const ydoc = useMemo(() => new Y.Doc(), []);

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      setProvider(
        new TiptapCollabProvider({
          name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${params.noteId}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? "",
          token: collabToken,
          document: ydoc,
        })
      );
    }
  }, [setProvider, collabToken, ydoc, params.noteId, hasCollab]);

  if (hasCollab && (!collabToken || !provider)) return;

  if (note === null) {
    return <div>Note not found</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen gap-4 mt-4">
      <div className="relative flex-1">
        {/* TODO: Editable Title look at Jotion for live updates */}
        {/* {note && <NoteTitleEditor initialNoteData={note} />} */}
        {/* TODO: look at https://blocksuite.io/ & https://www.blocknotejs.org/  - Want to save in markdown */}
        {/* {note && <NoteEditor initialNoteData={note} />} */}
        <h1>{note?.title}</h1>
        <p>{note?.content}</p>
      </div>
      <BlockEditor hasCollab={hasCollab} ydoc={ydoc} provider={provider} />
    </div>
  );
}
