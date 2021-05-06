'use strict'

export const FACEBOOK_PLATFORM_NAME = 'facebook'
export const PAGE_TYPE = {
  page: 'PAGE',
  group: 'GROUP',
  user: 'USER',
  closedGroup: 'CLOSED_GROUP',
}
export const PRIVACY = {
  closed: 'CLOSED',
  open: 'OPEN',
}
export const GET_FEEDS_FIELDS = [
  'id',
  // 'name',
  // 'description',
  'story',
  'message',
  'picture',
  'full_picture',
  'from' + buildSubFieldsString(['id', 'name', 'link']),
  // 'link',
  // 'type',
  'permalink_url',
  // 'source',
  'status_type',
  'created_time',
  'updated_time',
  // 'attachments',
  'attachments{description,title,media{source},media_type,unshimmed_url}',
  'shares',
  'is_hidden',
  'is_expired',
  'reactions.limit(0).summary(total_count)',
  'reactions.type(LOVE).limit(0).summary(total_count).as(reactions_love)',
  'reactions.type(WOW).limit(0).summary(total_count).as(reactions_wow)',
  'reactions.type(HAHA).limit(0).summary(total_count).as(reactions_haha)',
  'reactions.type(SAD).limit(0).summary(total_count).as(reactions_sad)',
  'reactions.type(ANGRY).limit(0).summary(total_count).as(reactions_angry)',
  'reactions.type(LIKE).limit(0).summary(total_count).as(reactions_like)',
  'comments.limit(0).summary(total_count)',
  'likes.limit(0).summary(total_count)',
].join(',')

export const GET_COMMENTS_FIELDS = [
  'created_time',
  'updated_time',
  'from' + buildSubFieldsString(['id', 'name', 'link']),
  'message',
  'reactions.limit(0).summary(true)',
  'reactions.type(LOVE).limit(0).summary(true).as(reactions_love)',
  'reactions.type(WOW).limit(0).summary(true).as(reactions_wow)',
  'reactions.type(HAHA).limit(0).summary(true).as(reactions_haha)',
  'reactions.type(SAD).limit(0).summary(true).as(reactions_sad)',
  'reactions.type(ANGRY).limit(0).summary(true).as(reactions_angry)',
  'reactions.type(LIKE).limit(0).summary(true).as(reactions_like)',
  'comments',
  'likes.limit(0).summary(true)',
].join(',')

export const GET_SHARE_FIELDS = [
  'created_time',
  'updated_time',
  'from' + buildSubFieldsString(['id', 'name', 'link']),
  'message',
  'description',
  'full_picture',
  'story',
  'type',
  'link',
  'permalink_url',
  'reactions.limit(0).summary(total_count)',
  'reactions.type(LOVE).limit(0).summary(total_count).as(reactions_love)',
  'reactions.type(WOW).limit(0).summary(total_count).as(reactions_wow)',
  'reactions.type(HAHA).limit(0).summary(total_count).as(reactions_haha)',
  'reactions.type(SAD).limit(0).summary(total_count).as(reactions_sad)',
  'reactions.type(ANGRY).limit(0).summary(total_count).as(reactions_angry)',
  'reactions.type(LIKE).limit(0).summary(total_count).as(reactions_like)',
  'comments.limit(0).summary(total_count)',
  'likes.limit(0).summary(total_count)',
].join(',')
function buildSubFieldsString(arr) {
  return '{' + arr.join(',') + '}'
}