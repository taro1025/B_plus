import axios from 'axios';
import { timelineUrl, indexPostsUrl, showPostsUrl, createPostsUrl, getPostsUrl } from "../urls/index";


export const getTimeline = () => {
  return axios.get(timelineUrl, { withCredentials: true })
    .then(res => {
      return res.data
    })
    .catch((e) => console.log("タイムラインの取得失敗", e))
};


export const createPost = (impression: string, book_isbn: string, title: string, rank: number): any => {
  return axios.post(createPostsUrl,
    {
      impression: impression,
      book_isbn: book_isbn,
      title: title,
      rank: rank
    }, { withCredentials: true })
    .then(res => {
      return res.data
    })
    .catch((e) => console.log("投稿失敗", e))
};

export const getPosts = (isbn: string) => {
  return axios.get(indexPostsUrl,
    {
      params: { book_isbn: isbn }
    })
    .then(res => {
      return res.data
    })
    .catch((e) => console.log("感想一覧の取得失敗", e))
};

export const getMyPosts = (isbn: string, userId: string) => {
  return axios.get(showPostsUrl(userId),
    {
      params: {
        book_isbn: isbn
      },
      withCredentials: true
    })
    .then(res => {
      return res.data
    })
    .catch((e) => console.log("自分の感想の取得失敗", e))
};


export const getPost = (postId: number) => {
  return axios.get(getPostsUrl(String(postId)))
    .then(res => {
      return res.data
    })
    .catch((e) => console.log("感想の取得失敗", e))
};
