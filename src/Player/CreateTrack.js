import ytdl from "react-native-ytdl";

const CreateTrack = async (idTrack, url, titleTrack, image) => {
  const urls = await ytdl(url, { quality: "highestaudio" });

  const obj = {
    id: idTrack,
    url: urls[0].url,
    title: titleTrack,
    artwork: image,
  };
  return obj;
};

export default CreateTrack;
