const GetMusicListApi = async (url, format) => {
  try {
    let response = await fetch(url);
    let output;
    if (format == 0) {
      output = await response.json();
    } else {
      output = await response.text();
    }
    return output;
  } catch (error) {
    console.error(error);
  }
};

export default GetMusicListApi;
