import moment from "moment";
import type { Session } from "../App";
import CurrentSession from "./CurrentSession";

interface SessionCardProps {
  name: string;
  startTime: string;
  endTime: string;
  status: Session["status"];
  isUpNext?: boolean;
}

const SessionCard = ({
  name,
  startTime,
  endTime,
  status,
  isUpNext = false,
}: SessionCardProps) => {
  const getActivityTimeInMinutes = () => {
    const a = moment(startTime);
    const b = moment(endTime);
    return b.diff(a, "minutes");
  };

  const formatDateOfActivity = () => {
    const date = moment(startTime);
    const formatWithMinutes = "MMMM DD [@] h:ma";
    const formatWithoutMintues = "MMMM DD [@] ha";
    if (date.minutes() > 0) {
      return date.format(formatWithMinutes);
    } else return date.format(formatWithoutMintues);
  };

  const isToday = () => {
    const today = moment();
    return moment(startTime).diff(today, "days") === 0;
  };

  if (isToday() && isUpNext) {
    return <CurrentSession name={name} activityTime={getActivityTimeInMinutes() + 'mins'} startTime={startTime}/>;
  }

  // This should be pulled out into a component too later
  return (
    <div className="sessionCard">
      <div className="sessionCardRow">
        <text>{name}</text>
        <text>{getActivityTimeInMinutes()} mins</text>
      </div>
      <div className="sessionCardRow">
        <text>{formatDateOfActivity()}</text>
        {status === "completed" && <text> ✅</text>}
      </div>
    </div>
  );
};

export default SessionCard;
