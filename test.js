import axios from "axios";
import {
  transformClosedGroup,
  transformFeed,
  transformComment,
} from "./transformer";
axios.defaults.baseURL = "https://graph.facebook.com/v7.0";
const ACCESS_TOKEN =
  "EAAAAZAw4FxQIBACUiDFoTwOpMWwHFCNeTQxhnoVP2am82cttZCzgBZBs23cJyUAHZCLOIZCSdrYXufq17PCDg9sxLtIyNPfEFxtJd3qhmsIaPCcbZBBkdYolfOffZBbcLhYPBr5YxcFOQgO2dJqTVfsRRW97NddvNDfzMTczX9GrgZDZD";
function createURL(param) {
  return BASE_URL + param;
}
function getComments(feed_id) {
  axios
    .get(feed_id, {
      access_token: ACCESS_TOKEN,
    })
    .then(function (response) {
      // handle success
      console.log(response.data);
      feed = response.data;
    }).catch(e => console.log(e));
  // try {
  //   const options = buildCommentsOptions(dataLimit)
  //   const res = await graph.get(url, options)
  //   const comments = res.data
  //     .filter((e) => {
  //       return moment(e.updated_time).valueOf() > limit
  //     })
  //     .map((e) => {
  //       return transformComment(e, feed)
  //     })
  //   console.log(`FeedCrawler get comments | ${feed.id} | ${res.data.length} | ${limit}`)
  //   const next = getNextComments(res, limit)
  //   return {
  //     next,
  //     comments,
  //   }
  // } catch (error) {
  //   console.log(error)
  //   throw error
  // }
}
getComments("1779208284_10208573871982473");
