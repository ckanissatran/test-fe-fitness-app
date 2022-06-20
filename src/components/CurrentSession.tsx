import { useEffect, useState } from "react";
import moment from "moment";

interface CurrentSessionProps {
  name: string;
  activityTime: string;
  startTime: string;
}

const CurrentSession = ({
  name,
  activityTime,
  startTime,
}: CurrentSessionProps) => {
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const hours = moment(startTime).diff(moment(), "hours");
      const minutes = moment(startTime).diff(moment(), "minutes") - hours * 60;
      const seconds =
        moment(startTime).diff(moment(), "seconds") - hours * 60 - minutes * 60;
      setCountdown(`${hours}:${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sessionCard">
      <text>Next Session starting in:</text>
      <text className="sessionCardMargin sessionCardCountdown">
        {countdown}
      </text>
      <text className="sessionCardMargin sessionCardSubtitle">
        {name} - {activityTime}
      </text>
      <button className="sessionStartButton sessionCardMargin">
        Start Now
      </button>
    </div>
  );
};

export default CurrentSession;
