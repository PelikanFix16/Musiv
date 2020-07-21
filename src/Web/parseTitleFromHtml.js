const ParseTitleFromHtml = (html) => {
  let re = /<title>(.*)<\/title>/gm;
  let regexText = re.exec(html);
  let replacedText = regexText[1]
    .replace("&quot;", '"')
    .replace(" - YouTube", "")
    .replace("&quot;", '"')
    .replace("&#39;", "'")
    .replace("&#39;", "'")
    .replace("&amp;", "&");
  return replacedText;
};

export default ParseTitleFromHtml;
