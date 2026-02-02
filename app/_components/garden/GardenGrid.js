import GardenCard from "./GardenCard";

export default function GardenGrid({
  entries,
  emptyMessage = "Noch keine Einträge im Garten...",
}) {
  if (!entries || entries.length === 0) {
    return (
      <div className="text-center py-20 opacity-60">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <GardenCard key={entry._id} entry={entry} />
      ))}
    </div>
  );
}
