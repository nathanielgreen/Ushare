class CoordinatesController < ApplicationController

  def create
    hash = JSON.parse(request.body.read)
    lat = hash['lat'].to_s
    long = hash['long'].to_s
    session = Session.find_by_auth_key(hash['auth_key'])
    if session
    user = User.find(session.user_id)
      coordinate = Coordinate.create(lat: lat,long: long, session_id: session.id, user_id: user.id)
      if coordinate
        render json: Coordinate.all, status: 201
      else
        render json: {messages: "coordinate not created" }
      end
    else
      render json: {messages: "session not found"}, status: :unauthorized
    end
  end


  def update
    hash = JSON.parse(request.body.read)
    session = Session.find_by_auth_key(hash['auth_key'])
    if session
      coordinate = Coordinate.find_by_session_id("#{session.id}")
      hash.delete('auth_key')
      if coordinate.update_attributes(hash)
        render json: Coordinate.all, status: 201
      else
        render json: {messages: "coordinate not updated" }, status: :unauthorized
      end
    else
      render json: {messages: "session not found" }, status: :unauthorized
    end
  end
end
