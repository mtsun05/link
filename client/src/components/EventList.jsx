import React from "react";
import { useState, useEffect } from "react";
import fetchAPI from "../api/fetchAPI";
import { DateTime } from "luxon";
import Button from "./utility/Button";
import RegisterModal from "./RegisterModal";
import timeFormat from "../util/timeFormatter";
import Error from "./pages/Error";
import { useAuth } from "../contexts/AuthContext";

const EventList = ({ id, joined }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSelection, setModalSelection] = useState(null);
  const [events, setEvents] = useState([
    {
      name: "",
      desc: "",
      capacity: 0,
      roles: [],
      time: {},
      join_type: "",
      participants: [],
      community: "",
      joined: false,
    },
  ]);

  const { user, loggedIn } = useAuth();
  const userID = user ? user._id : null;

  const handleOpenModal = (event) => {
    setModalSelection(event);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchEvents = async () => {
      try {
        const data = await fetchAPI(`/events/community/${id}`);
        const filtered = data.filter((event) => event.join_type != "invite");
        setEvents(filtered);
      } catch (e) {
        console.error(e.message);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [id]);

  const onJoin = async (data) => {
    setEvents((prev) => {
      return prev.map((event) => {
        if (event._id === data.event._id) {
          const updatedParticipants = [...event.participants, data.participant];
          return {
            ...event,
            participants: updatedParticipants,
            joined: true,
          };
        }
        return event;
      });
    });
  };

  const onLeave = async (id) => {
    try {
      const data = await fetchAPI(`/events/leave/${id}`, {
        method: "POST",
      });
      setEvents((prev) => {
        return prev.map((event) => {
          if (event._id === id) {
            return {
              ...event,
              participants: event.participants.filter(
                (p) => p.user.toString() !== userID.toString()
              ),
              joined: false,
            };
          }
          return event;
        });
      });
    } catch (e) {
      console.error(e.message);
      setError(e);
    }
  };

  if (loading) {
    return <span className="text-white">Loading events...</span>;
  }
  if (error) {
    return (
      <>
        <Error error={error} />
      </>
    );
  }
  if (events.length == 0) {
    return <span className="text-lg text-white">No events to display</span>;
  }

  return (
    <>
      <div className="flex flex-col">
        {Array.isArray(events) &&
          events.map((event) => {
            const shouldRender =
              (event.join_type === "community" && joined) ||
              event.join_type === "open";

            if (shouldRender) {
              return (
                <a
                  key={event._id}
                  href={`/events/${event._id}`}
                  className="flex flex-row text-white border-2 border-gray-400 rounded-lg w-1/2 p-5 my-1 justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold">{event.name}</span>
                    <span>{event.desc}</span>
                    <span>
                      {"Time: "}
                      {timeFormat(event.time.start, event.time.end)}
                    </span>
                    <span className="text-white">
                      {Array.isArray(event.participants)
                        ? event.participants.length
                        : 0}
                      /{event.capacity || 0} joined
                    </span>
                  </div>
                  {!event.joined &&
                  event.participants.length < event.capacity ? (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleOpenModal(event);
                      }}
                      name="Register"
                    />
                  ) : (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onLeave(event._id);
                      }}
                      name="Leave"
                      red={true}
                    />
                  )}
                </a>
              );
            }
          })}
        {modalSelection && (
          <RegisterModal
            open={isModalOpen}
            onClose={handleCloseModal}
            eventId={modalSelection._id}
            eventName={modalSelection.name}
            availableRoles={modalSelection.roles || []}
            onRegisterSuccess={onJoin}
            questions={modalSelection.questions}
          />
        )}
        ;
      </div>
    </>
  );
};

export default EventList;
