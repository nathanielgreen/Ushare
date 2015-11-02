require 'rails_helper'
describe "users" do

  def app
    Rails.application
  end

  context 'post request to /users' do
    it 'creates new user' do
      post '/users', {
        name: 'Mr Test',
        email: 'test@test.com',
        password: 'testtest',
        password_confirmation: 'testtest'
      }.to_json, {"CONTENT_TYPE" => 'application/json'}
      expect(User.all.count).not_to be(0)
    end
  end

end
