import React from "react";

const MemberList = ({ participants }) => {
  const hasParticipants =
    Array.isArray(participants) && participants.length > 0;

  return (
    <div className="p-6 rounded-lg shadow-xl border border-gray-700 my-8">
      <h3 className="text-3xl font-bold text-white mb-6 border-b pb-4 border-gray-600 text-center">
        Event Participants
      </h3>

      {!hasParticipants ? (
        <p className="text-gray-400 text-center py-8 text-lg">
          No participants have joined this event yet.
        </p>
      ) : (
        <div className="flex flex-col space-y-2">
          {" "}
          <div className="flex flex-row justify-between items-center p-3 font-bold text-white border-b border-gray-600">
            <div className="flex-1 text-left">Name</div>{" "}
            <div className="flex-1 text-right">Role</div>{" "}
          </div>
          {participants.map((person, index) => (
            <div
              key={person.user?._id || `participant-${index}`}
              className="flex flex-row justify-between items-center p-3 rounded-md hover:bg-neutral-800 transition duration-200 ease-in-out"
            >
              <div className="flex-1 text-white text-md font-medium text-left">
                {person.user.name}
              </div>

              <div className="flex-1 text-right">
                {person.role && (
                  <span className="text-gray-400 text-base px-2 py-1 rounded-full">
                    {person.role}
                  </span>
                )}
                {!person.role && (
                  <span className="text-gray-500 text-base">N/A</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MemberList;
