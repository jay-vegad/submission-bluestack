"use client";

interface PuppyFilterBarProps {
  whereFilter: "everywhere" | "imported" | "korean-teacup";
  onWhereChange: (val: "everywhere" | "imported" | "korean-teacup") => void;
  breedFilter: string | null;
  onBreedChange: (val: string | null) => void;
  genderFilter: "boys" | "girls" | null;
  onGenderChange: (val: "boys" | "girls" | null) => void;
  count: number;
}

const BREED_OPTIONS = [
  "Maltipoo",
  "Pomeranian",
  "Poodle",
  "Cavapoo",
  "Shih Tzu",
];

export function PuppyFilterBar({
  whereFilter,
  onWhereChange,
  breedFilter,
  onBreedChange,
  genderFilter,
  onGenderChange,
  count,
}: PuppyFilterBarProps) {
  const hasActiveFilters =
    whereFilter !== "everywhere" || breedFilter !== null || genderFilter !== null;

  return (
    <div className="w-full mb-12 sm:mb-16">
      {/* Clean & Simple Filter Box */}
      <div className="relative w-full rounded-3xl bg-[#fffdf8] border-2 border-[#2a170e] shadow-[0_4px_20px_rgba(42,23,14,0.06)] p-6 sm:p-8 lg:p-9">
        <div className="flex flex-col gap-6 sm:gap-7">
          {/* Row 1: where */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <span className="font-scrawl text-xl sm:text-2xl text-[#2a170e] sm:w-36 lg:w-40 shrink-0 tracking-wide select-none">
              where
            </span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5">
              {/* Everywhere tab */}
              <button
                type="button"
                onClick={() => onWhereChange("everywhere")}
                className={`tp-sticker-chip ${
                  whereFilter === "everywhere" ? "tp-sticker-chip--active" : ""
                }`}
              >
                Everywhere
              </button>

              {/* Imported tab */}
              <button
                type="button"
                onClick={() =>
                  onWhereChange(whereFilter === "imported" ? "everywhere" : "imported")
                }
                className={`tp-sticker-chip ${
                  whereFilter === "imported" ? "tp-sticker-chip--active" : ""
                }`}
              >
                Imported
              </button>

              {/* Korean Teacup tab */}
              <button
                type="button"
                onClick={() =>
                  onWhereChange(
                    whereFilter === "korean-teacup" ? "everywhere" : "korean-teacup"
                  )
                }
                className={`tp-sticker-chip ${
                  whereFilter === "korean-teacup" ? "tp-sticker-chip--active" : ""
                }`}
              >
                Korean Teacup
              </button>
            </div>
          </div>

          {/* Row 2: breed */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <span className="font-scrawl text-xl sm:text-2xl text-[#2a170e] sm:w-36 lg:w-40 shrink-0 tracking-wide select-none">
              breed
            </span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5">
              {BREED_OPTIONS.map((breed) => {
                const isSelected = breedFilter === breed;

                return (
                  <button
                    key={breed}
                    type="button"
                    onClick={() => onBreedChange(isSelected ? null : breed)}
                    className={`tp-sticker-chip ${
                      isSelected ? "tp-sticker-chip--active" : ""
                    }`}
                  >
                    {breed}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: boy or girl */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full">
            <span className="font-scrawl text-xl sm:text-2xl text-[#2a170e] sm:w-36 lg:w-40 shrink-0 tracking-wide select-none">
              boy or girl
            </span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 flex-1">
              {/* Boys tab */}
              <button
                type="button"
                onClick={() => onGenderChange(genderFilter === "boys" ? null : "boys")}
                className={`tp-sticker-chip ${
                  genderFilter === "boys" ? "tp-sticker-chip--active" : ""
                }`}
              >
                Boys
              </button>

              {/* Girls tab */}
              <button
                type="button"
                onClick={() => onGenderChange(genderFilter === "girls" ? null : "girls")}
                className={`tp-sticker-chip ${
                  genderFilter === "girls" ? "tp-sticker-chip--active" : ""
                }`}
              >
                Girls
              </button>

              {/* Clear filters button positioned at the end of the line strictly with Figtree font */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => {
                    onWhereChange("everywhere");
                    onBreedChange(null);
                    onGenderChange(null);
                  }}
                  className="ml-auto text-base sm:text-lg font-medium text-[#8e3f15] hover:text-[#6a2b0b] underline underline-offset-4 cursor-pointer transition-colors select-none py-1.5 px-2"
                  style={{ fontFamily: "var(--font-figtree), Figtree, sans-serif" }}
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Count Banner matching screenshot font and scale */}
      <div className="mt-5 px-1">
        <p className="font-scrawl text-[#2a170e] text-xl sm:text-2xl md:text-[25px] font-bold tracking-wide">
          {count} {count === 1 ? "puppy" : "puppies"} looking for a home
        </p>
      </div>
    </div>
  );
}
