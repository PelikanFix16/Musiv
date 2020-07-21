import GetMusicListApi from "./getMusicList";
import ParseTitleFromHtml from "./parseTitleFromHtml";

const GetNextSongId = async (currentSong) => {
  let firstRegex = /Jeśli masz włączone autoodtwarzanie, jako następny włączy się automatycznie proponowany film\W*contents":\W+\w+":{"videoId":"(.*?)"/gm;

  const link = "https://www.youtube.com/watch?v=" + currentSong;
  const response = await GetMusicListApi(link, 1);

  let nextVideoId = firstRegex.exec(response)[1];

  return nextVideoId;
};

const GetNextSong = async (currentSong) => {
  const nextSongId = await GetNextSongId(currentSong);
  const link = "https://www.youtube.com/watch?v=" + nextSongId;
  const response = await GetMusicListApi(link, 1);

  let obj = {
    id: nextSongId,
    videoUrl: link,
    videoImage: "https://img.youtube.com/vi/" + nextSongId + "/0.jpg",
    videoTitle: ParseTitleFromHtml(response),
  };
  return obj;
};

export default GetNextSong;
