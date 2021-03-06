module Types
  class QueryType < Types::BaseObject
    #graphqlはページングにconnectionsというものがあるらしい
    field :users, [Types::UserType], null: false
    def users
      User.all
    end

    field :timeline, [PostType], null: true, method: :get_timeline do
      description "current_userのタイムラインを取得"
      #argument :id, ID, required: true
    end

#Postデータ
    def timeline
      if user = context[:current_user]
        post = user.get_timeline

      end
    end

    field :post, [PostType], null: true do
      description "idを受け取りそのポストを返す"
      argument :id, ID, required: true
    end

    def post(id:)
      post = Post.find(id)
      [post]
    end

    field :myPosts, [PostType], null: true do
      description "isbnを受け取りその本に対してのcurrentuserのポストを返す"
      argument :isbn, String, required: true
    end

    def myPosts(isbn:)
      if user = context[:current_user]
        post = user.posts.where(book_isbn: isbn)

      end
    end

    field :posts, [PostType], null: true do
      description "isbnを受け取りその本に対してのポストを返す"
      argument :isbn, String, required: true
    end

    def posts(isbn:)
      post = Post.where(book_isbn: isbn)
    end


#コメントデータ
    field :get_comment, [CommentType], null: false do
      argument :post_id, ID, required: true
    end

    def get_comment(post_id:)
      post = Post.find(post_id)
      post.comments
    end

#ランクでーた
    field :rank, RankType, null: false do
      argument :user_id, ID, required: true
      argument :book_isbn, Integer, required: true
    end

    def rank(**arg)
      rank = Rank.find_by(id: arg[:user_id], book_isbn: arg[:book_isbn])
    end
  end
end

#query {
#  users {
#    name
#    id
#  }
#}
