import moment from "moment";
import { useEffect, useState } from "react";
import { getSessions } from "./api/getSessions";
import "./App.css";
import RedTodayDivider from "./components/RedTodayDivider";
import SessionCard from "./components/SessionCard";

//Types
export interface Session {
  id: number;
  user_id: number;
  name: string;
  routine_id: number;
  status: "upcoming" | "completed";
  start_time: string;
  end_time: string;
}

function App() {
  const [sessions, setSessions] = useState<Session[]>();
  const [pastSessions, setPastSessions] = useState<Session[]>();

  useEffect(() => {
    const getAllSessions = async () => {
      let data = await getSessions();
      const sortedDates = data.sort(function (a, b) {
        return a.start_time.localeCompare(b.start_time);
      });
      const datesBefore = sortedDates.filter((date) =>
        moment(date.start_time).isBefore(moment())
      );
      const datesIsSameOrAfter = sortedDates.filter((date) =>
        moment(date.start_time).isSameOrAfter(moment())
      );

      setPastSessions(datesBefore);
      setSessions(datesIsSameOrAfter);
    };
    getAllSessions().catch(console.error);
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1 className="headerText">Sessions</h1>
      </div>

      <div className="sessions">
        {/* Todo: Need to sort sessions by date */}
        {pastSessions &&
          pastSessions?.map((session, i) => (
            <SessionCard
              key={i}
              name={session.name}
              endTime={session.end_time}
              startTime={session.start_time}
              status={session.status}
            />
          ))}
        {/* Show all sessions before today */}
        <RedTodayDivider />
        {/* show all sessions after today */}
        {sessions &&
          sessions?.map((session, i) => (
            <SessionCard
              key={i}
              isUpNext={i === 0}
              name={session.name}
              endTime={session.end_time}
              startTime={session.start_time}
              status={session.status}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
