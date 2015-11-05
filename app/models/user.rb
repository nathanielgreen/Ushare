class User < ActiveRecord::Base
  has_many :sessions, dependent: :destroy
  has_secure_password
  validates_presence_of :email, :password_confirmation
  validates :email, uniqueness: true
  validates :password, length: { minimum: 5 }
end
