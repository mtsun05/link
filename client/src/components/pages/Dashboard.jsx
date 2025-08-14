import React from "react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [communities, setCommunities] = useState([
    {
      name: "",
      desc: "",
      members: [],
      capacity: 0,
      admins: [],
      privacy: false,
    },
  ]);

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
    },
  ]);

  useEffect(() => {
    setLoading(true);
    const fetchCommunities = async () => {
      try {
        const data = await fetchAPI(`/communities/${id}`);
        setCommunities(data);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCommunities();
  }, [id, userID]);

  return (
    <>
      <div class="flex h-screen text-white">
        <aside class="w-64 p-4 fixed h-full overflow-y-auto">
          <nav class="space-y-4">
            <div>
              <h3 class="text-gray-400 uppercase tracking-wide text-xs font-bold mb-2">
                Communities
              </h3>
              <ul class="space-y-2">
                <li>
                  <a href="#" class="block p-2 rounded-md hover:bg-[#1d1f24]">
                    Community 1
                  </a>
                </li>
                <li>
                  <a href="#" class="block p-2 rounded-md hover:bg-[#1d1f24]">
                    Community 2
                  </a>
                </li>
                <li>
                  <a href="#" class="block p-2 rounded-md hover:bg-[#1d1f24]">
                    All Communities
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-gray-400 uppercase tracking-wide text-xs font-bold mb-2">
                Events
              </h3>
              <ul class="space-y-2">
                <li>
                  <a href="#" class="block p-2 rounded-md hover:bg-[#1d1f24]">
                    Upcoming Events
                  </a>
                </li>
                <li>
                  <a href="#" class="block p-2 rounded-md hover:bg-[#1d1f24]">
                    My Events
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </aside>

        <main class="flex-1 p-6 md:ml-64">
          <div class="p-6 bg-[#1d1f24] rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-4">Upcoming Events</h2>
          </div>
        </main>
      </div>
    </>
  );
}
