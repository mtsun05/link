import React, { useState, useEffect } from "react";
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
  const [isAdmin, setIsAdmin] = useState(false);

  const { user, loggedIn } = useAuth();
  const userID = user ? user._id : null;

  useEffect(() => {
    setLoading(true);
    const fetchCommunity = async () => {
      try {
        const data = await fetchAPI(`/communities/${id}`);
        setIsAdmin(
          userID &&
            data.admins.some(
              (admin) => admin._id.toString() == userID.toString()
            )
        );
        setCommunity(data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [id, userID]);

  const onJoin = async () => {
    try {
      const data = await fetchAPI(`/communities/join/${community._id}`, {
        method: "POST",
      });
      setCommunity((prev) => {
        const updatedMembers = [...community.members, data.member];
        return {
          ...community,
          members: updatedMembers,
          joined: true,
        };
      });
    } catch (e) {
      console.error("Error encountered: ", e.message);
    }
  };

  const onLeave = async () => {
    try {
      const data = await fetchAPI(`/communities/leave/${id}`, {
        method: "POST",
      });
      setCommunity((prev) => {
        return {
          ...prev,
          members: community.members.filter(
            (p) => p._id.toString() !== userID.toString()
          ),
          admins: community.admins.filter(
            (p) => p._id.toString() !== userID.toString()
          ),
          joined: false,
        };
      });
    } catch (e) {
      console.error(e.message);
      setError(e);
    }
  };

  if (loading) return <div>Loading community...</div>;
  if (error) return <div>Error found: {error} </div>;

  return (
    <div className="container mx-auto p-8 md:flex md:space-between">
      <div className="flex flex-col md:w-1/2">
        <span className="text-5xl text-white font-bold">{community.name}</span>
        <HDivider />
        <span className="text-xl text-white font-sans">{community.desc}</span>
        <span className="text-lg text-neutral-400">
          {Array.isArray(community.members) ? community.members.length : 0}{" "}
          member{community.members.length != 1 ? "s" : ""}
        </span>

        <span className="text-lg text-neutral-400 mb-4">
          Admins:{" "}
          {Array.isArray(community.admins) && community.admins.length > 0
            ? community.admins[0].name
            : "None"}
        </span>
        <div className="flex flex-row space-x-2 space-y-2">
          {isAdmin && (
            <>
              <ButtonLink
                path={`/communities/manage/${community._id}`}
                name="Manage"
              />
              <ButtonLink
                path={`/events/create/${community._id}`}
                name="Create Event"
              />
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
            />
          ) : (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onLeave();
              }}
              name="Leave"
              red={true}
            />
          )}
        </div>
      </div>
      <VDivider className="hidden md:block" />
      <div className="flex flex-col md:w-1/2 mt-8 md:mt-0">
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
