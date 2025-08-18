import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import fetchAPI from "../../api/fetchAPI";
import { useAuth } from "../../contexts/AuthContext";

import ButtonLink from "../utility/buttons/ButtonLink";
import Button from "../utility/buttons/Button";
import EventList from "../utility/misc/EventList";
import HDivider from "../utility/misc/HDivider";
import VDivider from "../utility/misc/VDivider";

function Community() {
  const { id } = useParams();
  const [community, setCommunity] = useState({
    name: "",
    desc: "",
    members: [],
    capacity: 0,
    admins: [],
    privacy: false,
    joined: false,
  });
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const { user, loggedIn } = useAuth();
  const userID = user ? user._id : null;

  const fetchCommunity = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAPI(`/communities/${id}`);
      setCommunity(data);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const isAdmin =
    community &&
    userID &&
    community.admins.some(
      (admin) => admin._id.toString() === userID.toString()
    );

  useEffect(() => {
    fetchCommunity();
  }, [fetchCommunity]);

  const onJoin = async () => {
    try {
      const data = await fetchAPI(`/communities/join/${community._id}`, {
        method: "POST",
      });
      fetchCommunity();
    } catch (e) {
      console.error("Error encountered: ", e.message);
    }
  };

  const onLeave = async () => {
    try {
      const data = await fetchAPI(`/communities/leave/${id}`, {
        method: "POST",
      });
      fetchCommunity();
    } catch (e) {
      console.error(e.message);
      setError(e);
    }
  };

  if (loading) return <div>Loading community...</div>;
  if (error) return <div>Error found: {error} </div>;

  return (
    <div className="w-full p-8 flex md:flex-row flex-col justify-around h-screen w-full">
      <div className="flex flex-col mx-4">
        <div className="flex flex-col border border-gray-400 rounded-xl p-5 h-fit">
          <span className="text-5xl text-white font-bold">
            {community.name}
          </span>
          <HDivider />
          <span className="text-xl text-white font-sans">{community.desc}</span>
          <span className="text-lg text-neutral-400">
            {Array.isArray(community.members) ? community.members.length : 0}{" "}
            member{community.members.length != 1 ? "s" : ""}
          </span>

          <span className="text-lg text-neutral-400 mb-4">
            Admins:{" "}
            {Array.isArray(community.admins) && community.admins.length > 0
              ? community.admins.map((admin) => {
                  return admin.name;
                })
              : "None"}
          </span>
          <div className="flex flex-row space-x-2 space-y-2">
            {isAdmin && (
              <>
                <ButtonLink path={`/communities/manage/${community._id}`}>
                  Manage
                </ButtonLink>
                <ButtonLink path={`/events/create/${community._id}`}>
                  Create Event
                </ButtonLink>
              </>
            )}
            {!community.joined ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onJoin();
                }}
                name="Join"
              >
                Join
              </Button>
            ) : (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onLeave();
                }}
                name="Leave"
                red={true}
              >
                Leave
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col border border-gray-400 rounded-xl p-5 mt-4 h-full">
          <span className="text-5xl text-white font-bold">Members</span>
          <HDivider />
        </div>
      </div>
      <div className="flex flex-col md:w-1/2 border border-gray-400 rounded-xl p-5">
        <span className="text-5xl text-white font-bold">Events</span>
        <HDivider />
        {!community.privacy ? (
          community._id ? (
            <EventList id={community._id} joined={community.joined} />
          ) : (
            <span className="text-white">Loading events...</span>
          )
        ) : (
          <span className="text-white">Join this community to view events</span>
        )}
      </div>
    </div>
  );
}

export default Community;
