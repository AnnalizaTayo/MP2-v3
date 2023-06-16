import React, { useState, useEffect } from "react";
import { DayPicker } from 'react-day-picker';
import {BsTrashFill , BsFillCameraVideoFill} from 'react-icons/bs'
import 'react-day-picker/dist/style.css';
import "./VetConsultationPage.css";
//import "./Consultation.css";
import Chatbot from "../components/ChatBot";

const VetConsultationPage = () => {
  const userString = localStorage.getItem("user");
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [consultationDate, setConsultationDate] = useState(null);
  const [consultationTime, setConsultationTime] = useState("");
  const [concern, setConcern] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [consultationLog, setConsultationLog] = useState([]);
  const [consultationSchedule, setConsultationSchedule] = useState([]);
  // eslint-disable-next-line
  const [sortedConsultationSchedule, setSortedConsultationSchedule] = useState([]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    if (userString) {
      setUser(JSON.parse(userString));
    } else {
      alert("You are not logged in. Please login to your account.");
      window.location.href = "/login";
    }
  }, [userString]);

  useEffect(() => {
    // Sort the consultation schedule by date
    const sortedSchedule = consultationSchedule.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setSortedConsultationSchedule(sortedSchedule);
  }, [consultationSchedule]);
  

  useEffect(() => {
    // Fetch the user data from the API
    fetch("https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users")
      .then((response) => response.json())
      .then((data) => {
        const foundUser = data.find((u) => u.email === user?.email);
        if (foundUser) {
          setConsultationLog(foundUser.vetconsultationlog || []);
          setConsultationSchedule(foundUser.vetconsultationschedule || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user?.email]);

  const handleDayClick = (date) => {
    setConsultationDate(date);
    setAvailableTimes(["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]);
  };

  const handleTimeChange = (event) => {
    setConsultationTime(event.target.value);
  };

  const handleConcernChange = (event) => {
    setConcern(event.target.value);
  };

  const handleScheduleConsultation = (event) => {
    event.preventDefault();
    setErrorMessage("");
    // Check if the consultation date and time are selected
    if (!consultationDate || !consultationTime) {
      setErrorMessage("Please select a date and time for the consultation.");
      return;
    }

    // Check if the selected date and time are in the future
    const now = new Date();
    if (
      consultationDate < now ||
      (consultationDate.getTime() === now.getTime() &&
        consultationTime <= now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    ) {
      setErrorMessage("Please select a future date and time.");
      return;
    }

    const currentDate = new Date();
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999

    // Construct the reference number using the timestamp and random number
    const idNumber = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}${randomNum}`;

    // Check if the selected date is already scheduled
    const isDateScheduled = consultationSchedule.some(
      (appointment) => appointment.date === consultationDate.toISOString()
    );

    if (isDateScheduled) {
      setErrorMessage("The selected date is already scheduled for an appointment.");
      return;
    }

    // Prepare the appointment data to be posted
    const appointmentData = {
      referenceNumber: idNumber,
      petName: user.petName || "",
      concern: concern,
      date: consultationDate.toISOString(),
      time: consultationTime,
    };

    // Get the user ID
    const userId = user.id;

    // Post the appointment data to the API
    fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vetconsultationlog: [
          {
            referenceNumber: appointmentData.referenceNumber,
            logType: "set",
            logDate: new Date().toISOString(),
            appointmentDate: appointmentData.date,
            appointmentTime: appointmentData.time,
          },
          ...consultationLog,
        ],
        vetconsultationschedule: [
          {
            referenceNumber: appointmentData.referenceNumber,
            petName: appointmentData.petName,
            concern: appointmentData.concern,
            date: appointmentData.date,
            time: appointmentData.time,
          },
          ...consultationSchedule,
        ],
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Display a success message or redirect to a confirmation page
        alert("Consultation scheduled successfully!");

        setConsultationLog(data.vetconsultationlog);
        setConsultationSchedule(data.vetconsultationschedule);

        // Clear the input fields
        setConsultationDate(null);
        setConsultationTime("");
        setConcern("");
        setErrorMessage("");
      })
      .catch(error => {
        console.error("Error scheduling consultation:", error);
        alert("An error occurred while scheduling the consultation. Please try again later.");
      });
  };

  const handleCancelAppointment = (referenceNumber) => {
    setErrorMessage("");
    // Find the appointment to be canceled
    const appointment = consultationSchedule.find(appt => appt.referenceNumber === referenceNumber);
    if (!appointment) {
     
      return;
    }

    // Update the consultation schedule by removing the canceled appointment
    const updatedSchedule = consultationSchedule.filter(appt => appt.referenceNumber !== referenceNumber);
    setConsultationSchedule(updatedSchedule);
    const currentDate = new Date();
    const randomNum = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999

    // Construct the reference number using the timestamp and random number
    const idNumber = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${currentDate.getMilliseconds()}${randomNum}`;

    // Create a cancellation log
    const cancellationLog = {
      referenceNumber: idNumber,
      logType: "cancel",
      logDate: new Date().toISOString(),
      appointmentDate: appointment.date,
      appointmentTime: appointment.time,
    };

    // Update the consultation log with the cancellation log
    const updatedLog = [cancellationLog, ...consultationLog];
    setConsultationLog(updatedLog);

    // Make a PUT request to update the API with the updated consultation log and schedule
    fetch(`https://6475abd1e607ba4797dc4d7a.mockapi.io/api/v1/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vetconsultationlog: updatedLog,
        vetconsultationschedule: updatedSchedule,
      }),
    })
      .then(response => response.json())
      .then(data => {
        alert("Appointment canceled successfully!");
      })
      .catch(error => {
        console.error("Error canceling appointment:", error);
        alert("An error occurred while canceling the appointment. Please try again later.");
      });
  };
  

  return (
    <div className="vet-consultation-page">
      {/* Display the pet information */}
      <aside className="pet-information">
        <div className="pet-profile">
          <img src={user?.petPicture} alt="Pet" />
          <h2>{user?.petName}</h2>
          <p>Type: {user?.petType}</p>
        </div>
        <div className="appointment-schedule">
          <h2>Upcoming Appointments</h2>
          {consultationSchedule.length === 0 ? (
            <p>No upcoming appointments</p>
          ) : (
            <div className="appointmentList-container">
              <ul className="appointmentList">
                <li className="consultationListHead">
                  <span>Date</span>
                  <span>Time</span>
                  <span>Concern</span>
                  <span>Cancel</span>
                </li>
                {consultationSchedule.map((appointment) => (
                  <li className="consultationList" key={appointment.referenceNumber}>
                    <span>{`${new Date(appointment.date).toLocaleDateString()}`}</span>
                    <span>{`${appointment.time}`}</span>
                    <span>{`${appointment.concern}`}</span>
                    <button className="cancelAppointment" onClick={() => handleCancelAppointment(appointment.referenceNumber)}>
                      <BsTrashFill/>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="consultation-log loglist">
          <h2>Consultation Logs</h2>
          {consultationLog.length === 0 ? (
            <p>No consultation log entries</p>
          ) : (
            <div className="appointmentList-container">
              <ul className="appointmentList">
                <li className="consultationListHead">
                  <span>Log Date</span>
                  <span>Appt. Date</span>
                  <span>Appt. Time</span>
                  <span>Type</span>
                </li>
                {consultationLog.map((log) => (
                  <li className="consultationLogList" key={log.referenceNumber}>
                    <span>{`${new Date(log.logDate).toLocaleString()}`}</span>
                    <span>{`${new Date(log.appointmentDate).toLocaleDateString()}`}</span>
                    <span>{`${log.appointmentTime}`}</span>
                    <span>{`${log.logType}`}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

      {/* Display the consultation scheduler */}
      <div className="consultation-scheduler">
        <h3>Schedule an Online Vet Consultation</h3>
        <div className="webcon">
          <BsFillCameraVideoFill/>
          <p>Web conferencing details will be provided upon confirmation.</p>
        </div>
        <div>
          <button className="button" onClick={togglePopup}>Show Details</button>
          {showPopup && (
            <div className="popup">
              <div className="deatils-container">
                <p>Upon confirmation, you will receive the necessary information for the web conferencing session.<br/><br/></p>
                <p>Get a teleconsultation or book a clinic visit with our licensed veterinarians!<br/><br/></p>
                <p>FOR ONLY 500 PHP get an Online Vet Consultation. GET YOUR SECOND CONSULTATION FOR FREE if you book today!<br/><br/></p>
                <p>Once booking is confirmed, we will confirm with you via email so we can match you with a vet!<br/><br/></p>
                <p>*By booking a consultation, you agree to our Terms and Conditions and Privacy Policy.<br/></p>
              </div>
              <button className="button" onClick={togglePopup}>Close</button>
            </div>
          )}
        </div>
        <form onSubmit={handleScheduleConsultation}>
          <div className="form-group">
            <label htmlFor="consultationDate"><h4>Consultation Date:</h4></label>
            <DayPicker selected={consultationDate} onDayClick={handleDayClick} />
          </div>
          <div className="form-group">
            <label htmlFor="consultationTime">Consultation Time:</label>
            <select
              id="consultationTime"
              value={consultationTime}
              onChange={handleTimeChange}
              disabled={!consultationDate}
            >
              <option value="">Select a time</option>
              {availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="concern">Concern:</label>
            <textarea
              id="concern"
              value={concern}
              onChange={handleConcernChange}
              placeholder="Enter your pet's health concern"
              disabled={!consultationDate || !consultationTime}
            ></textarea>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit" className="sched button" disabled={!consultationDate || !consultationTime}>
            Schedule Consultation
          </button>
        </form>
        
      </div>

      {/* Display the poweecha bot */}
      <Chatbot/>
    </div>
  );
};

export default VetConsultationPage;