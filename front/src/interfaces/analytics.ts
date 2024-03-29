export interface AnalyticsI {
  _id: string;
  clientId: string;
  sessionId: string;
  service: string;
  tagId?: string | null;
  eventName: string;
  url: string;
  userAgent: string;
  date: Date;
  customData: Object | null;
  appId: string;
  skip: number;
}
