import React from "react";

export default function Dashboard() {
  return (
    <>
      <div class="flex h-screen text-white">
        <aside class="w-64 p-4 fixed h-full overflow-y-auto">
          <div class="text-2xl font-bold mb-6">Dashboard</div>
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
          <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-[#1d1f24] p-6 rounded-lg shadow-lg">Card 1</div>
            <div class="bg-[#1d1f24] p-6 rounded-lg shadow-lg">Card 2</div>
            <div class="bg-[#1d1f24] p-6 rounded-lg shadow-lg">Card 3</div>
          </section>

          <div class="mt-6 p-6 bg-[#1d1f24] rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-4">Detailed Information</h2>
            <p>This is where more detailed content or tables would go.</p>
          </div>
        </main>
      </div>
    </>
  );
}
