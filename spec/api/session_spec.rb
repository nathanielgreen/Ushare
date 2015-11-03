require 'rails_helper'

describe "Sessions" do

  let!(:user) { create :user }

  # def app
  #   Rails.application
  # end

  context 'post request to /sessions' do


    context 'when password is correct' do

      before { session_sign_in }

      it 'can start a new session' do
        expect(last_response.status).to eq(201)
      end

      it 'returns authorisation key' do
        json = JSON.parse(last_response.body)
        expect(json['auth_key']).not_to be(nil)
      end

    end

    context 'when password is wrong' do

      before { session_wrong_sign_in }

      it 'returns 401 status code' do
        expect(last_response.status).to eq(401)
      end

      it 'renders error message' do
        json = JSON.parse(last_response.body)
        expect(json['messages']).to eq("Invalid Email or Password")
      end

      it 'does not return authorisation key' do
        json = JSON.parse(last_response.body)
        expect(json['auth_key']).to be(nil)
      end

    end
  end

  context 'sign out' do

    it 'deletes the session with correct credentials' do
      session_sign_in
      user = User.find_by_email('test@test.com')
      session = Session.find_by_user_id("#{user.id}")
      delete '/sessions', {
        auth_key: "#{session.auth_key}"
      }.to_json, {"CONTENT_TYPE" => 'application/json'}
      expect(last_response.status).to eq 200
    end

    it 'cannot delete the session with incorrect credentials' do
      delete '/sessions', {
        auth_key: "qwjeb123qwe123u"
      }.to_json, {"CONTENT_TYPE" => 'application/json'}
      expect(last_response.status).to eq 401
    end

  end


end
