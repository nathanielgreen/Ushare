require 'rails_helper'
describe "users" do

  def app
    Rails.application
  end

  context 'post request to /sessions' do

    context 'when password is correct' do

      it 'can start a new session' do
        user = User.create(email: 'test@test.com', name: 'test boy', password: 'testing1', password_confirmation: 'testing1')
        post '/sessions', {
          email: 'test@test.com',
          password: 'testing1',
        }.to_json, {"CONTENT_TYPE" => 'application/json'}
        expect(last_response.status).to eq(201)
      end

      it 'returns authorisation key' do
        user = User.create(email: 'test@test.com', name: 'test boy', password: 'testing1', password_confirmation: 'testing1')
        post '/sessions', {
          email: 'test@test.com',
          password: 'testing1',
        }.to_json, {"CONTENT_TYPE" => 'application/json'}
        json = JSON.parse(last_response.body)
        expect(json['auth_key']).not_to be(nil)
      end

    end

    context 'when password is wrong' do

      it 'returns 401 status code' do
        user = User.create(email: 'test@test.com', name: 'test boy', password: 'testing1', password_confirmation: 'testing1')
        post '/sessions', {
          email: 'test@test.com',
          password: 'incorrect',
        }.to_json, {"CONTENT_TYPE" => 'application/json'}
        expect(last_response.status).to eq(401)
      end

      it 'renders error message' do
        user = User.create(email: 'test@test.com', name: 'test boy', password: 'testing1', password_confirmation: 'testing1')
        post '/sessions', {
          email: 'test@test.com',
          password: 'incorrect',
        }.to_json, {"CONTENT_TYPE" => 'application/json'}
        json = JSON.parse(last_response.body)
        expect(json['messages']).to eq("Invalid Email or Password")
      end

      it 'does not return authorisation key' do
        user = User.create(email: 'test@test.com', name: 'test boy', password: 'testing1', password_confirmation: 'testing1')
        post '/sessions', {
          email: 'test@test.com',
          password: 'incorrect',
        }.to_json, {"CONTENT_TYPE" => 'application/json'}
        json = JSON.parse(last_response.body)
        expect(json['auth_key']).to be(nil)
      end

    end
  end


end
