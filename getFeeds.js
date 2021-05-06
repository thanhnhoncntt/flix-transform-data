import api from "./api";
import { transformFeed } from "./transformer";
import { GET_FEEDS_FIELDS } from "./constants";
import { writeFile } from "./writeFile";

function getFeeds(page) {
  api
    .get(page.id + "/feed?" + GET_FEEDS_FIELDS)
    .then(function (res) {
      const feeds = res.data.data.map((e) => {
        return transformFeed(e, page);
      });
      let data = JSON.stringify(feeds);
      writeFile("feeds", data);
      return true;
    })
    .catch((e) => console.log(e));
}

// dữ liệu 1 queue get feeds
const queueFeed = {
  data: {
    type: "getFeeds",
    url: "/309972372349806/feed",
    page: {
      _id: "facebook_309972372349806",
      platform: "facebook",
      pageType: "PAGE",
      id: "309972372349806",
      industries: ["automotive", "general"],
    },
    limit: 1619490007304,
    force: false,
    total: 0,
  },
  returnValue: null,
};
getFeeds(queueFeed.data.page);

309972372349806;
