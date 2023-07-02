import { useAppContext } from "../contexts/manage-app.context";
import { AnalyticsI } from "../interfaces/analytics";

interface Props {
  analytic: AnalyticsI;
  selectField: (key: string, value: string) => void;
}

export default function AnalyticItemRow({ analytic, selectField }: Props) {
  const { tags } = useAppContext();

  const {
    eventName,
    clientId,
    sessionId,
    service,
    tagId,
    url,
    userAgent,
    date,
    customData,
  } = analytic;

  const tagName = tags.find((tag) => tag._id === tagId)?.name;

  return (
    <tr className="hover">
      <th
        className="cursor-pointer hover:underline"
        onClick={() => selectField("eventName", eventName)}
      >
        {eventName}
      </th>
      <td
        className="cursor-pointer hover:underline"
        onClick={() => selectField("clientId", clientId)}
      >
        {clientId}
      </td>
      <td>{sessionId}</td>
      <td
        className="cursor-pointer hover:underline"
        onClick={() => selectField("service", service)}
      >
        {service ?? "None"}
      </td>
      <td
        className="cursor-pointer hover:underline"
        onClick={() => selectField("tagId", tagId ?? "")}
      >
        {tagName ?? "None"}
      </td>
      <td
        className="cursor-pointer hover:underline"
        onClick={() => selectField("url", url)}
      >
        {url}
      </td>
      <td>{userAgent}</td>
      <td>{new Date(date).toLocaleString()}</td>
      <td>{JSON.stringify(customData)}</td>
    </tr>
  );
}
