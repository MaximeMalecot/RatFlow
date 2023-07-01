import { AnalyticsI } from "../interfaces/analytics";

interface Props {
    analytic: AnalyticsI;
    selectField: (key: string, value: string) => void;
}

export default function AnalyticItemRow({ analytic, selectField }: Props) {
    const {
        eventName,
        clientId,
        sessionId,
        service,
        url,
        userAgent,
        date,
        customData,
    } = analytic;

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
