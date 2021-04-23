'use strict'

import _ from 'underscore'
import standardizeLocation from './location/standardize_location'
import humps from 'humps'
import {
  FACEBOOK_PLATFORM_NAME,
  PAGE_TYPE,
  PRIVACY,
} from './constants'

import Entity from './entity'

export function transformGroup(source) {
  return Object.assign(
    {
      pageType: PAGE_TYPE.group,
      privacy: PRIVACY.open,
    },
    transform(source)
  )
}

export function transformClosedGroup(source) {
  return Object.assign(
    {
      pageType: PAGE_TYPE.closedGroup,
      privacy: PRIVACY.closed,
    },
    transform(source)
  )
}

export function transformPage(source) {
  return Object.assign(
    {
      pageType: PAGE_TYPE.page,
      privacy: PRIVACY.open,
    },
    transform(source)
  )
}

export function transformUser(source) {
  const page = Object.assign(
    {
      platform: FACEBOOK_PLATFORM_NAME,
      hasPermission: true,
      graphData: true,
      pageType: PAGE_TYPE.user,
      privacy: PRIVACY.open,
    },
    humps.camelizeKeys(source)
  )
  if (!_.isUndefined(page.friends)) {
    page.friendsCount = page.friends.summary.total_count
  }
  delete page.friends
  return page
}

export function transformComment(source, feed) {
  const comment = Object.assign(
    {
      platform: FACEBOOK_PLATFORM_NAME,
      commentsCount: 0,
      likesCount: 0,
      reactionsCount: 0,
      reactionsSummary: {
        love: 0,
        wow: 0,
        like: 0,
        haha: 0,
        sad: 0,
        angry: 0,
      },
    },
    humps.camelizeKeys(source)
  )
  if (feed) {
    comment.feed = Entity.buildId(feed.platform, feed.id)
    comment.page = feed.page
    comment.pageType = feed.pageType
    comment.privacy = feed.privacy
    comment.industries = feed.industries
    comment.graphData = feed.graphData
  }
  transformCommentsCount(comment)
  transformLikesCount(comment)
  transformAllReactions(comment)
  transformFrom(comment)
  return comment
}

export function transformFeed(source, page) {
  const feed = initDocument(source)
  transformPageOfFeed(feed, page)
  transformSalePost(feed)
  transformCommentsCount(feed)
  transformLikesCount(feed)
  transformSharesCount(feed)
  transformAllReactions(feed)
  transformFrom(feed)
  return feed
}

export function transformShare(source, parent) {
  const feed = initDocument(source)
  if (parent) {
    feed.isSubjectRelated = parent.isSubjectRelated
    feed.shareFrom = Entity.buildId(parent.platform, parent.id)
    feed.page = parent.page
    feed.pageType = parent.pageType
    feed.privacy = parent.privacy
    feed.industries = parent.industries
    feed.graphData = parent.graphData
  }
  transformCommentsCount(feed)
  transformLikesCount(feed)
  transformSharesCount(feed)
  transformAllReactions(feed)
  transformFrom(feed)
  return feed
}

export function transformPageOfFeed(feed, page) {
  if (page) {
    feed.page = Entity.buildId(FACEBOOK_PLATFORM_NAME, page.id)
    feed.privacy = page.privacy
    feed.pageType = page.pageType
    feed.industries = page.industries
    feed.graphData = page.graphData
  }
}

function initDocument(source) {
  return Object.assign(
    {
      platform: FACEBOOK_PLATFORM_NAME,
      hasPermission: true,
      commentsCount: 0,
      likesCount: 0,
      reactionsCount: 0,
      sharesCount: 0,
      reactionsSummary: {
        love: 0,
        wow: 0,
        like: 0,
        haha: 0,
        sad: 0,
        angry: 0,
      },
    },
    humps.camelizeKeys(source)
  )
}

function transform(source) {
  const page = Object.assign(
    {
      platform: FACEBOOK_PLATFORM_NAME,
      hasPermission: true,
      graphData: true,
    },
    humps.camelizeKeys(source)
  )
  page.picture =
    page.picture && page.picture.data && page.picture.data.url
      ? page.picture.data.url
      : null
  return page
}

function transformAllReactions(document) {
  transformTotalReactionsCount(document)
  transformReactionsCount(document, 'reactionsWow', 'wow')
  transformReactionsCount(document, 'reactionsLove', 'love')
  transformReactionsCount(document, 'reactionsLike', 'like')
  transformReactionsCount(document, 'reactionsHaha', 'haha')
  transformReactionsCount(document, 'reactionsSad', 'sad')
  transformReactionsCount(document, 'reactionsAngry', 'angry')
}

function transformSharesCount(document) {
  transformCount(document, 'shares', 'sharesCount')
}

function transformLikesCount(document) {
  transformCount(document, 'likes', 'likesCount')
}

function transformCommentsCount(document) {
  transformCount(document, 'comments', 'commentsCount')
}

function transformTotalReactionsCount(document) {
  transformCount(document, 'reactions', 'reactionsCount')
}

function transformCount(document, oldField, newField) {
  if (document[oldField]) {
    if (document[oldField].summary && document[oldField].summary.totalCount) {
      document[newField] = parseFloat(document[oldField].summary.totalCount)
    } else if (document[oldField].count) {
      document[newField] = parseFloat(document[oldField].count)
    }
    delete document[oldField]
  }
}

function transformSalePost(document) {
  if (document.permalinkUrl && document.permalinkUrl.includes('sale_post')) {
    document.salePost = true
    if (document.attachments.data.length > 0) {
      document.message = document.attachments.data[0].description
      document.title = document.attachments.data[0].title
    }
  }
}

function transformReactionsCount(document, oldFieldName, newFieldName) {
  if (
    document[oldFieldName] &&
    document[oldFieldName].summary &&
    document[oldFieldName].summary.totalCount
  ) {
    document.reactionsSummary[newFieldName] = parseFloat(
      document[oldFieldName].summary.totalCount
    )
  }
  delete document[oldFieldName]
}

function transformFrom(document) {
  if (document.from) {
    if (
      !_.isUndefined(document.from.birthday) &&
      document.from.birthday.length > 1
    ) {
      let birthday = document.from.birthday.split('/')
      if (birthday[birthday.length - 1].length == 4) {
        document.from.birthday = birthday[birthday.length - 1]
      } else {
        delete document.from.birthday
      }
    }
    if (
      !_.isUndefined(document.from.location) &&
      (!_.isUndefined(document.from.location.name) ||
        !_.isUndefined(document.from.location.city))
    ) {
      document.from.location.standardized = standardizeLocation(
        document.from.location.name || document.from.location.city
      )
    }
    if (!_.isUndefined(document.from.work)) {
      for (let i = 0; i < document.from.work.length; i++) {
        if (
          isNaN(new Date(document.from.work[i].startDate).valueOf()) ||
          document.from.work[i].startDate == '0000-00'
        ) {
          delete document.from.work[i].startDate
        }
        if (
          isNaN(new Date(document.from.work[i].endDate).valueOf()) ||
          document.from.work[i].endDate == '0000-00'
        ) {
          delete document.from.work[i].endDate
        }
      }
    }
  }
}
