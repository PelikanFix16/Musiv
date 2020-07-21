import GetMusicListApi from "./getMusicList";

const GetNextSong = async (currentSong) => {
  const response = await GetMusicListApi(currentSong, 1);
  console.log(response);
};

export default GetNextSong;
