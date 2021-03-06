import { useState, useEffect, useContext } from "react"
import { UserId } from "../App"
import { bookStateProps } from "../interfaces"
import { useParams } from 'react-router-dom'
import styled from "styled-components"

import { Detail } from "../components/detailTabs/Detail"
import { Posts } from "../components/detailTabs/Posts"
import { getPosts, getMyPosts } from "../apis/graphQL/post"
import { graphQL } from "../apis/graphQL/client"
import { postI } from "../interfaces"

//to use for Tab
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel, allyProps } from '../components/TabPanel';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiBox-root': {
      padding: '0px',
    },
  },
}));
//　メ　モ
//reloadするとstateの値が消えてしまうのでエラーになる
//そこを余裕が出た時localstrageとか使って改善したい


export const DetailBook = (props: bookStateProps) => {

  const classes = useStyles(props);

  const params = useParams<{ id: string }>()

  //タブの切り替えに使う
  const [value, setValue] = useState(0)
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };


  const userId = useContext(UserId)
  const [myPosts, setMyPosts] = useState<postI[]>()
  const [posts, setPosts] = useState<postI[]>()
  useEffect(() => {
    console.log("userId", userId)
    if (userId) {
      graphQL(getMyPosts(params.id))
        .then((res) => {
          setMyPosts(res.myPosts)

        })
    } else { console.log("ログインしてください") }
    graphQL(getPosts(params.id))
      .then((res) => {
        setPosts(res.posts)
      })

  }, [])
  return (

    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="登録" {...allyProps(0)}></Tab>
        <Tab label="みんなの感想" {...allyProps(1)}></Tab>
        <Tab label="自分の感想" {...allyProps(2)}></Tab>
      </Tabs>

      <TabPanel className={classes.root} value={value} index={0}>
        <Detail />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Posts
          posts={posts}
          setComments={setPosts}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Posts
          posts={myPosts}
          setComments={setMyPosts}
        />
      </TabPanel>

    </Paper>


  )
}
