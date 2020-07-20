import { parse } from "@babel/core";

const ParseToVideoList = (json) => {
  let vId = [];
  for (let k in json.items) {
    vId.push(json.items[k].id.videoId);
  }

  return vId;
};

export default ParseToVideoList;
