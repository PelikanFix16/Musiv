import GetMusicListApi from "./getMusicList";
import ParseTitleFromHtml from "./parseTitleFromHtml";

const getList = (json) => {
  let vId = [];

  for (let k in json.items) {
    if (
      json.items[k].id.videoId != null ||
      json.items[k].id.videoId != undefined
    ) {
      vId.push(json.items[k].id.videoId);
    }
  }
  return vId;
};

const createThubnailsList = (list) => {
  let thubnailList = [];
  for (let k in list) {
    thubnailList.push("https://img.youtube.com/vi/" + list[k] + "/0.jpg");
  }
  return thubnailList;
};

const titleFromWeb = async (item) => {
  const link = "https://www.youtube.com/watch?v=" + item;
  const response = await GetMusicListApi(link, 1);

  return ParseTitleFromHtml(response);
};

const getTitles = async (list) => {
  //<meta itemprop="name" content="\w.+"

  const res = await Promise.all(
    list.map(async (i) => {
      return await titleFromWeb(i);
    }),
  );
  return res;
};

const ParseToVideoList = async (json) => {
  let list = [];
  console.log(json);
  const listVideosId = getList(json);
  const thubList = createThubnailsList(listVideosId);
  const titles = await getTitles(listVideosId);

  for (let index in listVideosId) {
    let obj = {
      id: listVideosId[index],
      videoUrl: "https://www.youtube.com/watch?v=" + listVideosId[index],
      videoImage: thubList[index],
      videoTitle: titles[index],
    };
    list.push(obj);
  }

  return list;
};

export default ParseToVideoList;
