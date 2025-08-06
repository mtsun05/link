import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchAPI from "../../api/fetchAPI";
import { useAuth } from "../../contexts/AuthContext";
import { DateTime } from "luxon";

import ButtonLink from "../utility/buttons/ButtonLink";
import Button from "../utility/buttons/Button";
import RegisterModal from "../utility/misc/RegisterModal";
import MemberList from "../utility/misc/MemberList";
import HDivider from "../utility/misc/HDivider";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({
    name: "",
    desc: "",
    capacity: 0,
    roles: [],
    time: {},
    join_type: "",
    participants: [],
    community: "",
    joined: false,
  });
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(true);

  const { user, loggedIn } = useAuth();
  const userID = user ? user._id : null;

  useEffect(() => {
    setLoading(true);
    const fetchEvent = async () => {
      try {
        const data = await fetchAPI(`/events/${id}`);
        console.log(data.participants);
        setEvent(data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const onJoin = async (data) => {
    try {
      const data = await fetchAPI(`/events/register/${id}`, {
        method: "POST",
      });
      setEvent((prev) => {
        const updatedParticipants = [...event.participants, data.participant];
        return {
          ...event,
          participants: updatedParticipants,
          joined: true,
        };
      });
    } catch (e) {
      console.error(e.message);
      setError(e);
    }
  };

  const onLeave = async (id) => {
    try {
      const data = await fetchAPI(`/events/leave/${id}`, {
        method: "POST",
      });
      setEvent((prev) => {
        return {
          ...prev,
          participants: event.participants.filter(
            (p) => p.user.toString() !== userID.toString()
          ),
          joined: false,
        };
      });
    } catch (e) {
      console.error(e.message);
      setError(e);
    }
  };

  if (loading) return <div>Loading event...</div>;
  if (error) return <div>Error found: {error} </div>;

  return (
    <>
      <div className="flex flex-row mx-5">
        <div className="flex flex-col">
          <span className="text-5xl font-bold text-white mb-2">
            {event.name}
          </span>
          <HDivider />
          <span className="text-xl text-white">{event.desc}</span>
          <span className="text-lg text-neutral-400">
            {"Time: "}
            {DateTime.fromISO(event.time.start, { zone: "utc" })
              .toLocal()
              .toLocaleString(DateTime.DATETIME_MED)}
            {" - "}
            {DateTime.fromISO(event.time.end, { zone: "utc" })
              .toLocal()
              .toLocaleString(DateTime.DATETIME_MED)}
          </span>
          <span className="text-lg text-neutral-400">
            {Array.isArray(event.participants) ? event.participants.length : 0}/
            {event.capacity || 0} joined
          </span>
          <div className="flex flex-row mt-4">
            {!event.joined && event.participants.length < event.capacity ? (
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
            <RegisterModal
              open={isModalOpen}
              onClose={handleCloseModal}
              eventId={event._id}
              eventName={event.name}
              availableRoles={event.roles || []}
              onRegisterSuccess={onJoin}
              questions={event.questions}
            />
          </div>
          <MemberList participants={event.participants} />
        </div>
      </div>
    </>
  );
};

export default Event;
