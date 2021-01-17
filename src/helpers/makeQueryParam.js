export const makeQueryParam = (param) => {
  if (!param) return "";
  let query =
    "?" +
    Object.keys(param)
      .map((data) => {
        return data + "=" + encodeURIComponent(param[data]);
      })
      .join("&");

  return query;
};
