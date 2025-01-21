import React, { useState, useEffect } from "react";
import "./ReminderPage.css";

const ReminderPage = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Request Notification permission on page load
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Check for reminders due every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      reminders.forEach((reminder, index) => {
        if (new Date(reminder.date) <= now && !reminder.notified) {
          showNotification(reminder.text);
          updateNotifiedStatus(index);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [reminders]);

  const addReminder = () => {
    if (newReminder.trim() && dueDate) {
      setReminders([
        ...reminders,
        { text: newReminder, date: new Date(dueDate).toISOString(), notified: false },
      ]);
      setNewReminder("");
      setDueDate("");
    }
  };

  const removeReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
  };

  const updateNotifiedStatus = (index) => {
    const updatedReminders = [...reminders];
    updatedReminders[index].notified = true;
    setReminders(updatedReminders);
  };

  const showNotification = (message) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Reminder Alert", {
        body: message,
        icon: "https://via.placeholder.com/100", // Optional: add an icon
      });
    }
  };

  return (
    <div className="reminder-container">
      <h1 className="title">Reminder Page</h1>
      <div className="input-container">
        <input
          type="text"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          placeholder="Enter a reminder"
          className="input-box"
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-picker"
        />
        <button onClick={addReminder} className="add-button">
          Add
        </button>
      </div>
      <ul className="reminder-list">
        {reminders.map((reminder, index) => (
          <li key={index} className="reminder-item">
            <div>
              <strong>{reminder.text}</strong>
              <br />
              <span className="due-date">
                Due: {new Date(reminder.date).toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => removeReminder(index)}
              className="delete-button"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReminderPage;
