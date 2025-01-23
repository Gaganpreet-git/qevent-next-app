import ArtistCard from "@/components/ArtistCard";

export default async function ArtistsPage() {
  const response = await fetch("https://qevent-backend.labs.crio.do/artists");
  const artists = await response.json();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 place-items-center">
      {artists.map((artist) => (
        <ArtistCard artistData={artist} key={artist.id} />
      ))}
    </div>
  );
}
