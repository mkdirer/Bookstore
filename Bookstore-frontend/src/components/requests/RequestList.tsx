import { useState, useEffect } from "react";
import { BlankPanel, RequestCard } from "..";
import { NoDataMessage } from "..";


/**
 * Returns list of CardRequest submited by user.
 * @returns {JSX.Element} - The rendered RequestList component.
 */
const RequestList: React.FC = (): JSX.Element => {
  const [requests, setRequests] = useState([
    {
      title: "Request 1",
      user_id: "user123",
      add_date: "2023-05-12",
      message: "Lorem ipsum dolor sit amet",
      id: "48723547623678"
    },
    {
      title: "Request 2",
      user_id: "user456",
      add_date: "2023-05-13",
      message: "Consectetur adipiscing elit",
      id: "234"
    },
    {
      title: "Request 3",
      user_id: "user789",
      add_date: "2023-05-14",
      message: "Sed do eiusmod tempor incididunt",
      id: "35345345345"
    },
    {
      title: "Request 4",
      user_id: "user101112",
      add_date: "2023-05-15",
      message: "Ut labore et dolore magna aliqua",
      id: "476235465326"
    },
    {
      title: "Request 5",
      user_id: "user131415",
      add_date: "2023-05-16",
      message: "Ut enim ad minim veniam",
      id: "34534643"
    },
  ]);

  return (
    <BlankPanel sx={{
      minWidth: "600px",
      width: "1200px"}} >
      {requests.map((request) => (
        <RequestCard
          title={request.title}
          user_id={request.user_id}
          add_date={request.add_date}
          message={request.message}
          key={request.id}
        />
      ))}
      {requests.length === 0 && <NoDataMessage />}
    </BlankPanel>
  );
};

export { RequestList };
