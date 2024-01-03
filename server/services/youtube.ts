import "dotenv/config";
import { google } from "googleapis";

console.log("Api key: ", process.env.YOUTUBE_APIKEY?.slice(0, 5));

export const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_APIKEY,
});
