"use client";

import { FaqNoteItem as FaqNoteItemType } from "./types";
import { FaqNoteItem } from "./faq-note-item";
import { siteMetadata } from "@/app/data/site-data";

interface FaqBoardProps {
  notes: FaqNoteItemType[];
  searchQuery: string;
  openId: string | null;
  onToggleNote: (id: string) => void;
  onClearSearch: () => void;
}

export function FaqBoard({
  notes,
  searchQuery,
  openId,
  onToggleNote,
  onClearSearch,
}: FaqBoardProps) {
  return (
    <div className="tp-notes__board flex-1 w-full max-w-5xl xl:max-w-6xl mx-auto">
      {notes.length > 0 ? (
        <ul className="tp-notes__list">
          {notes.map((note) => (
            <FaqNoteItem
              key={note.id}
              item={note}
              isOpen={openId === note.id}
              onToggle={() => onToggleNote(note.id)}
            />
          ))}
        </ul>
      ) : (
        /* Empty Search Results Pin Note */
        <div className="tp-note tp-note--empty">
          <span className="text-3xl sm:text-4xl block mb-3 text-center">🐾</span>
          <h3 className="font-plush-text text-xl sm:text-2xl text-[#2a170e] mb-2 font-bold text-center">
            No notes sniffed out!
          </h3>
          <p className="font-body text-[#5a3a28] text-sm sm:text-base mb-6 leading-relaxed text-center">
            Teddy couldn&apos;t find any notes matching &ldquo;
            <span className="font-semibold text-[#a24a1a]">{searchQuery}</span>
            &rdquo;. Try another breed, delivery keyword, or message us
            directly!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onClearSearch}
              className="button-ghost text-sm py-2 px-5"
            >
              Clear search
            </button>
            <a
              href={siteMetadata.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-sm py-2 px-5"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
