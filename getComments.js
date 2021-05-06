import moment from "moment";
import api from "./api";
import { transformComment } from "./transformer";
import { GET_COMMENTS_FIELDS } from "./constants";
import { writeFile } from "./writeFile";

function getComments(feed) {
  api
    .get(feed.id + "/comments?" + GET_COMMENTS_FIELDS)
    .then(function (res) {
      const comments = res.data.data.map((e) => {
        return transformComment(e, feed);
      });
      let data = JSON.stringify(comments);
      writeFile("comments", data);
      return true;
    })
    .catch((e) => console.log(e));
}

// dữ liệu 1 queue get comments
const queueFeed = {
  data: {
    type: "getFeed",
    feed: {
      _id: "facebook_309972372349806_4274858892527781",
      privacy: "OPEN",
      platform: "facebook",
      pageType: "PAGE",
      createdTime: "2021-04-21T10:36:05+0000",
      id: "309972372349806_4274858892527781",
      graphData: true,
      industries: ["general", "cars"],
      isSubjectRelated: true,
      page: "facebook_309972372349806",
    },
    url: "/309972372349806_4274858892527781",
    force: false,
  },
  returnValue: null,
};
getComments(queueFeed.data.feed);
