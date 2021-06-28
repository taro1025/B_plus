import AnchorLink from "react-anchor-link-smooth-scroll";
import styled from 'styled-components';
import dummyImage from "../dummyImage.jpeg"
import { NoDecoLink } from "./NoDecoLink";
import { getBooksByRank } from "../apis/getBooksByRank"
import { getBooks } from "../apis/getBooks"
import { useEffect, useState, useContext } from "react"
import { UserId } from "../App"


const HierarchyWrapper = styled.div`
  display: flex;
  //height: 100%;
`

const JumpWrapper = styled.div`
  position: fixed;
    position: -webkit-sticky; /* Safariに対応する */
  position: sticky; /* 要素を固定/解除する */
  top: 70px;
  height: 100%;
  left: 0.1rem;
`
const JumpBar = styled.div`
  width: .7rem;
  height: 500px;
  background-color: #333333;
  border-radius: 10px;
  opacity: 0.7;
  position: absolute;
  top:0;
  left: .25rem;

`
const RankWrapper = styled.div`
  position: relative;
  height: 500px;
  top:0;
  left: 0;
  display:flex;
  flex-flow: column;
  justify-content:space-between;
  z-index: 99

`

const Anchor = styled(AnchorLink)`
  width: 1.3rem;
  height: 1.3rem;
  background-color: #111188;
  border-radius: 100%;
  text-align: center;

  text-decoration: none;
  :active {
    color: #000000;
  }
  :focus {
    outline: none;
  }

`

const CircleSpan = styled.span`
  opacity: initial;
  width: 100%;
  height: 100%;
  color: white;

`

const BooksWrapper = styled.div`
  padding-left: .3rem;
  padding-right: .15rem;
  padding-bottom: 60px;
`
const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

`
const Li = styled.li`
  flex-basis: 33.3%;
`

const Img = styled.img`
  width: 100%;
  border: 1px solid #fff;
`

//実際には、ランクごとに本を取得して表示させる。

export const Hierarchy = () => {
  const dummy_books: any = []
  for (let i = 0; i < 20; i++) {
    dummy_books.push(
      <Li><NoDecoLink to={`/book/9999999`}><Img src={dummyImage} /></NoDecoLink></Li>
    )
  }
  //interface fetchBooksForPost {
  //  url: string;
  //  title: string;
  //}
  //const [ata, setData] = useState<fetchBooksForPost[]>()
  //let booksForPost: fetchBooksForPost[] = []
  //
  //async function getBookImgEveryOneSecond() {
  //  if (books && books.sumLength) {
  //    for (const post of books.sumLength) {
  //      await getBooks(post.book_isbn)
  //        .then((res) => {
  //          booksForPost.push({
  //            url: res.Items[0].Item.mediumImageUrl,
  //            title: res.Items[0].Item.title
  //          })
  //        })
  //        .catch(res => console.log("失敗"))
  //      await sleep(1000)
  //    }
  //  }
  //  setBooks(booksForPost)
  //}

  interface RankI {
    s: any;
    a: any;
    b: any;
    c: any;
    d: any;
    sumLength: number;
  }
  const [books, setBooks] = useState<RankI>()
  const userId = useContext(UserId)
  useEffect(() => {
    getBooksByRank(String(userId))
      .then(res => {
        setBooks({
          s: res.s,
          a: res.a,
          b: res.b,
          c: res.c,
          d: res.d,
          sumLength: res.sum
        })
      })
  }, [])
  return (
    <HierarchyWrapper>
      <JumpWrapper>
        <RankWrapper>
          <Anchor href="#s"><CircleSpan>S</CircleSpan></Anchor>
          <Anchor href="#a"><CircleSpan>A</CircleSpan></Anchor>
          <Anchor href="#b"><CircleSpan>B</CircleSpan></Anchor>
          <Anchor href="#c"><CircleSpan>C</CircleSpan></Anchor>
          <Anchor href="#d"><CircleSpan>D</CircleSpan></Anchor>
        </RankWrapper>
        <JumpBar />
      </JumpWrapper>
      <BooksWrapper>
        <p>Sだお</p>
        <section id="s">
          <Ul>

            {
              books &&
              books.s.map((book: any) => {
                console.log(book.book_isbn)
                getBooks(book.book_isbn)
                  .then(res => {
                    return <Li><NoDecoLink to={`/book/${book.book_sibn}`}><Img src={res.Item && res.Items[0] && res.Items[0].Item.mediumImageUrl} /></NoDecoLink></Li>
                  })
                  .catch(e => console.log(e))
              })
            }
          </Ul>
        </section>
              Aだお
      <section id="a">
          <Ul>

            {
              dummy_books.map((book: any) => {
                return book
              })
            }
          </Ul>
        </section>
              Bだお
      <section id="b">
          <Ul>

            {
              dummy_books.map((book: any) => {
                return book
              })
            }
          </Ul>
        </section>
              Cだお
      <section id="c">
          <Ul>

            {
              dummy_books.map((book: any) => {
                return book
              })
            }
          </Ul>
        </section>
        <section id="d">
          <Ul>

            {
              dummy_books.map((book: any) => {
                return book
              })
            }
          </Ul>
        </section>
      </BooksWrapper>
    </HierarchyWrapper>
  )
}
