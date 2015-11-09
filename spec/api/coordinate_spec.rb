require 'rails_helper'

describe "Coordinates" do

  context 'post request to /coordinates' do
    it 'will add new coordinates if auth key correct' do
      sign_up
      session = Session.last
      post '/coordinates', {
        "lat": "1",
        "long": "1",
        "auth_key": "#{session.auth_key}"
      }.to_json, {"CONTENT_TYPE" => 'application/json'}
      expect(last_response.status).to be 201
    end

    it 'will not add new coordinates if auth key incorrect' do
      sign_up
      session = Session.last
      post '/coordinates', {
        "lat": "1",
        "long": "1",
        "auth_key": "incorrect"
      }.to_json, {"CONTENT_TYPE" => 'application/json'}
      expect(last_response.status).to be 401
    end

  end

  context 'put request to /coordinates' do
    it 'will update coordinates if auth key correct' do
      sign_up
      session = Session.last
      post '/coordinates', {
        "lat": "1",
        "long": "1",
        "auth_key": "#{session.auth_key}"
      }.to_json, {"CONTENT_TYPE" => 'application/json'}
      put '/coordinates', {
        "lat": "51.5173918",
        "long": "-0.0731214",
        "auth_key": "#{session.auth_key}"
      }.to_json, {"CONTENT_TYPE" => 'application/json'}
      coordinate = Coordinate.find_by_session_id(session.id)
      expect(coordinate.lat).to eq "51.5173918"
    end

    it 'will not update coordinates if auth key incorrect' do
      sign_up
      session = Session.last
      post '/coordinates', {
        "lat": "1",
        "long": "1",
        "auth_key": "#{session.auth_key}"
      }.to_json, {"CONTENT_TYPE" => 'application/json'}
      put '/coordinates', {
        "lat": "2",
        "long": "2",
        "auth_key": "incorrect"
      }.to_json, {"CONTENT_TYPE" => 'application/json'}
      expect(last_response.status).to eq 401
    end
  end

end
