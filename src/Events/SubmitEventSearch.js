import GetMusicListApi from "../Web/getMusicList";
import ParseToVideoList from "../Web/parseToVideoList";
import GetUrlApi from "../consts/GetYoutubeApiUrl";

const SubmitEventSearch = async (setLoading, setMusicList, search) => {
  setLoading(1);
  const j = await GetMusicListApi(GetUrlApi(search), 0);
  const videoList = await ParseToVideoList(j);
  setMusicList(videoList);
  setLoading(0);
};
export default SubmitEventSearch;
