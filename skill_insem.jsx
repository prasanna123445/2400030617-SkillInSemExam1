import React, { useState } from "react";

const CalendarWithEvents = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Predefined events
  const events = [
    { date: "2025-10-05", title: "Team Meeting", description: "Discuss project progress." },
    { date: "2025-10-10", title: "Client Presentation", description: "Present design updates to the client." },
    { date: "2025-10-16", title: "Code Review", description: "Review new feature implementation." },
    { date: "2025-10-20", title: "Workshop", description: "Attend UI/UX design workshop." },
  ];

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Generate array of dates for the month
  const dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDateClick = (day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formattedDate);
  };

  // Filter events for selected date
  const selectedEvents = events.filter((event) => event.date === selectedDate);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        {today.toLocaleString("default", { month: "long" })} {year}
      </h2>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {dates.map((day) => {
          const isSelected =
            selectedDate === `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              className={`cursor-pointer p-2 rounded-lg ${
                isSelected
                  ? "bg-blue-500 text-white font-bold"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Event display section */}
      <div className="mt-6">
        {selectedDate ? (
          selectedEvents.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Events on {selectedDate}:
              </h3>
              {selectedEvents.map((event, index) => (
                <div key={index} className="p-3 mb-2 border rounded-lg bg-gray-50">
                  <h4 className="font-bold">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">
              No events scheduled for {selectedDate}.
            </p>
          )
        ) : (
          <p className="text-gray-500 text-center italic">
            Click a date to view events.
          </p>
        )}
      </div>
    </div>
  );
};

export default CalendarWithEvents;
