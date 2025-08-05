import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchAPI from "../../api/fetchAPI";
import { useAuth } from "../../contexts/AuthContext";

import ButtonLink from "../utility/ButtonLink";
import Button from "../utility/Button";
import EventList from "../EventList";
import HDivider from "../utility/HDivider";
import VDivider from "../utility/VDivider";

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
            (p) => p.toString() !== userID.toString()
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
    <>
      <div className="flex flex-row items-start m-5 w-1/2">
        <div className="flex flex-col">
          <span className="text-5xl text-white font-bold">
            {community.name}
          </span>
          <HDivider />
          <span className="text-xl text-white font-sans">{community.desc}</span>
          <span className="text-lg text-neutral-400">
            {Array.isArray(community.members) ? community.members.length : 0}{" "}
            member{community.members.length > 1 ? "s" : ""}
          </span>

          <span className="text-lg text-neutral-400 mb-4">
            Admins:{" "}
            {Array.isArray(community.admins) && community.admins.length > 0
              ? community.admins[0].name
              : ""}
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
            {!community.joined &&
            community.members.length < community.capacity ? (
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
      </div>
      <div className="flex flex-col m-5">
        <span className="text-3xl text-white font-bold">Events</span>
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
    </>
  );
}

export default Community;
