class CoordinatesController < ApplicationController
  include CoordinatesHelper

  def create
    hash = JSON.parse(request.body.read)
    lat = hash['lat'].to_s
    long = hash['long'].to_s
    lat_end = hash['lat_end'].to_s
    long_end = hash['long_end'].to_s
    session = Session.find_by_auth_key(hash['auth_key'])
    if session
    user = User.find(session.user_id)
      coordinate = Coordinate.create(lat: lat,long: long, session_id: session.id, user_id: user.id, long_end: long_end, lat_end: lat_end)
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
        # price_info = JSON.parse((show_price(coordinate)).body)
        # estimated_price = price_info['prices'][0]['estimate']
        # coordinate.update_attribute(:estimated_price, estimated_price)
        render json: Coordinate.all, status: 201
      else
        render json: {messages: "coordinate not updated" }, status: :unauthorized
      end
    else
      render json: {messages: "session not found" }, status: :unauthorized
    end

  end

end
