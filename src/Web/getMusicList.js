const GetMusicListApi = async (url) => {
  try {
    let response = await fetch(url);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default GetMusicListApi;
