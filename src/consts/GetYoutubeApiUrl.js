import Config from "react-native-config";

const GetUrlApi = (search) => {
  return (
    "https://www.googleapis.com/youtube/v3/search?q=" +
    search +
    "&maxResults=20&key=" +
    Config.YOUTUBE_API_KEY
  );
};

export default GetUrlApi;
