class CoordinatesController < ApplicationController
  include CoordinatesHelper

  def create
    hash = JSON.parse(request.body.read)
    session = Session.find_by_auth_key(hash['auth_key'])
    hash.delete('auth_key')
    if session
    hash[:session_id] = session.id
    user = User.find(session.user_id)
    coordinate = Coordinate.create(hash)
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
        coordinate.update_attribute(:estimated_price, price(coordinate))
        render json: Coordinate.all, status: 201
      else
        render json: {messages: "coordinate not updated" }, status: :unauthorized
      end
    else
      render json: {messages: "session not found" }, status: :unauthorized
    end

  end

end
