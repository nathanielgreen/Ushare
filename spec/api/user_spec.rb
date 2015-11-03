require 'rails_helper'

describe "Users" do

  # def app
  #   Rails.application
  # end

  context 'post request to /users' do

    context 'with correct details' do

      it 'creates new user' do
        sign_up
        expect(User.all.count).not_to be(0)
      end

      it 'returns an authorisation key' do
        sign_up
        json = JSON.parse(last_response.body)
        expect(json['auth_key']).not_to be(nil)
      end

    end

    context 'with incorrect details' do

      it 'it displays an error message' do
        incorrect_sign_up
        json = JSON.parse(last_response.body)
        expect(json['password_confirmation']).to eq(['doesn\'t match Password'])
      end

      it 'it has a status code of 401' do
        incorrect_sign_up
        json = JSON.parse(last_response.body)
        expect(last_response.status).to eq 401
      end

    end

    context 'delete request to /users' do
      it 'with valide authorisation key deletes the user\'s record' do 

      end
    end

  end


end
