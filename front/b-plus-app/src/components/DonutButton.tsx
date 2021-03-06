import styled from "styled-components"
import { registerWantToBook } from "../apis/bookWantToRead"
import { useContext } from 'react'
import { User } from "../App"
import { useState } from "react"
import { RegisterReadBook } from "./register/RegisterReadBook"
import { RegisterFavoriteBook } from "./register/RegisterFavoriteBook"

//メ　モ
//本当はドーナツ型のボタンにしたかったのだけどやり方が分からなかった。
const Wrapper = styled.div`
  padding-top: 1rem;
`

const Ul = styled.ul`
 display: flex;
`

const Button = styled.button`
  color: initial;
  background-color: initial;
  flex: auto;
  text-align: center;
  line-height: 60px;
  height: 60px;
`


export const DonutButton = (props: { book: any }) => {

  const context: any = useContext(User)

  const handleWantToBook = () => {
    if (context.user) {
      registerWantToBook(
        props.book.isbn, context.user.id,
        props.book.mediumImageUrl, props.book.largeImageUrl
      )
    } else {
      console.log("ログインが必要")
    }
  }


  const [isReadBookDialog, setReadBookDialog] = useState(false)
  const [isFavoriteBookDialog, setFavoriteBookDialog] = useState(false)

  return (
    <>
      <Wrapper>
        <Ul>
          <Button onClick={() => setReadBookDialog(true)}>読んだ本に登録</Button>
          <Button onClick={() => handleWantToBook()}>読みたい本に登録</Button>
          <Button onClick={() => setFavoriteBookDialog(true)}>人生の本に登録</Button>
        </Ul>
      </Wrapper>
      {isReadBookDialog && <RegisterReadBook setReadBookDialog={setReadBookDialog} isReadBookDialog={isReadBookDialog} />}
      {isFavoriteBookDialog && <RegisterFavoriteBook book={props.book} setFavoriteBookDialog={setFavoriteBookDialog} isFavoriteBookDialog={isFavoriteBookDialog} />}
    </>
  );
};
