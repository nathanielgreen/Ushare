FactoryGirl.define do
  factory :user do
    email 'test@test.com'
    name 'test boy'
    password 'testing1'
    password_confirmation 'testing1'
  end

end
