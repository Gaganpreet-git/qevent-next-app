import Tag from "@/components/Tag";

const EventDetails = async ({ params }) => {
  const data = await fetch(`https://qevent-backend.labs.crio.do/events/${params.eventId}`);
  const eventDetails = await data.json();

  return (
    <div className="h-fit md:w-[80%] w-full m-auto p-4 text-dark">
      <img
        className=" h-[35vh] w-fit mb-3 object-contain group-hover:filter-none shadow-lg m-auto"
        src={eventDetails.image}
        alt="Bonnie image"
      />
      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
        {eventDetails.name}
      </h1>
      <h2 className="text-xl font-bold max-sm:text-lg bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
        {eventDetails.location}
      </h2>
      <h2 className="text-xl font-bold max-sm:text-lg bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
        {eventDetails.artist}
      </h2>
      <div className="mt-20">
        <div className="flex gap-4 items-center mb-5">
          {eventDetails.tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
        <p className="mb-5 text-xl">
        {eventDetails.description}
        </p>
        <div className="flex items-center justify-between">
          <h3 className="text-4xl font-bold max-sm:text-lg bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
            ${eventDetails.price}
          </h3>
          <div className="flex items-center justify-end">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">
              Buy Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
