import { Dispatch, SetStateAction } from 'react';


export interface LoginInterface {
  email: string;
  password: string;
}

//export type IState = {
//  name: string,
//  id?: number
//}
export type IState = {

  name: string,
  id?: number,
  email: string,
  password_digest: string,
  updated_at: string,
  created_at: string,
}

export interface inputValueInterface {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}


export interface loginProps {
  loginAction: (props: any, data: any) => void;
  loggedInStatus: boolean;
}

export interface bookStateProps {
  books: any;
  setBooks: React.Dispatch<any>
}

export interface BookProps {
  user_id: number;
  book_isbn: string;
  user_name: string;
  id: number;
  created_at: string;
  updated_at: string;
}

export interface BookWantToRead {
  book_isbn: string;
  url?: string;
  medium_url?: string;
  user_id: number;
  id: number;
  created_at: string;
  updated_at: string;
}
export interface RankProps {
  id: number;
  rank?: number;
  created_at: string;
  updated_at: string;
  book_isbn: string;
  medium_url?: string;
  url?: string;
}

export interface GraphInterface {
  today: {
    page: number;
    amount_book: number;
  },
  four: {
    page: number;
    amount_book: number;
  },
  eight: {
    page: number;
    amount_book: number;
  },
  twelve: {
    page: number;
    amount_book: number;
  },
  six_teen: {
    page: number;
    amount_book: number;
  },
  twenty: {
    page: number;
    amount_book: number;
  },
  twenty_four: {
    page: number;
    amount_book: number;
  },
  twenty_eight: {
    page: number;
    amount_book: number;
  },
}

export interface MonthInterface {
  this_month: {
    page: number;
    amount_book: number;
  },
  last_month: {
    page: number;
    amount_book: number;
  },
}

export interface userI {
  id: number;
  email?: string;
  image?: {
    url?: string;
  }
  name: string;
  password_digest?: string;
  updated_at?: string;
  created_at?: string;
  description?: string;
}


export interface contextUserI {
  user?: userI
}


export interface commentI {
  comment: string;
  id?: number;
  post_id?: number;
  updated_at?: string;
  created_at?: string;
  user_id?: number;
  user_name?: string
}


export interface commentAndUserI {
  comment: commentI[]
  users: userI[]
}

export interface postI {
  id: number;
  impression: string;
  title: string;
  user: userI
  rank: {
    rank: number;
    mediumUrl: string;
  }
  comments: {
    user: userI
    comment: string;
  }[]
}
