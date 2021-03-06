class Rank < ApplicationRecord
  default_scope -> { order(created_at: :desc) }
  belongs_to :user
  has_many :posts

  validates :rank,
    presence: true,
    numericality: { greater_than: -1, less_than: 6 }

  validates :user_id, uniqueness: { scope: :book_isbn }

end
