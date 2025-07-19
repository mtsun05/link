import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ButtonLink from "../utility/ButtonLink";
import Button from "../utility/Button";
import fetchAPI from "../../api/fetchAPI";

function Community() {
  const { id } = useParams();
  const [community, setCommunity] = useState({
    name: "",
    desc: "",
    members: [],
    capacity: 0,
    admins: [],
    joined: false,
  });
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchCommunity = async () => {
      try {
        let data = await fetchAPI(`/communities/${id}`);
        setCommunity(data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [id]);

  const onJoin = async () => {
    try {
      const data = await fetchAPI(`/communities/join/${community._id}`, {
        method: "POST",
      });
      window.location.reload();
    } catch (e) {
      console.error("Error encountered: ", e.message);
    }
  };

  if (loading) return <div>Loading community...</div>;
  if (error) return <div>Error found: {error} </div>;

  return (
    <>
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          <span className="text-5xl text-white">{community.name}</span>
          <span className="text-xl text-white">{community.desc}</span>
          <span className="text-xl text-white">
            {Array.isArray(community.members) ? community.members.length : 0}/
            {community.capacity || 0} Members
          </span>
          <span className="text-xl text-white">
            Admins:{" "}
            {Array.isArray(community.admins) && community.admins.length > 0
              ? community.admins[0].name
              : ""}
          </span>
        </div>
        <div>
          <ButtonLink
            path={`/communities/manage/${community._id}`}
            name="Manage"
          />
          {!community.joined &&
            community.members.length < community.capacity && (
              <Button onClick={onJoin} name="Join" />
            )}
        </div>
      </div>
    </>
  );
}

export default Community;
