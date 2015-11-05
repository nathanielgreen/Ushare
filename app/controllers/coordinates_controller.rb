class CoordinatesController < ApplicationController

  def create
    hash = JSON.parse(request.body.read)
    lat = hash['lat'].to_s
    long = hash['long'].to_s
    session = Session.find_by_auth_key(hash['auth_key'])
    if session
      coordinate = Coordinate.create(lat: lat,long: long, session_id: session.id)
      if coordinate
        render json: {messages: "success"}, status: 201
      else
        render json: {messages: "coordinate fucked"}
      end
    else
      render json: {messages: "session fucked"}, status: :unauthorized
    end
  end


  def update
    hash = JSON.parse(request.body.read)
    session = Session.find_by_auth_key(hash['auth_key'])
    if session
      coordinate = Coordinate.find_by_session_id("#{session.id}")
      if coordinate
        coordinate.update(lat:(hash['lat']),long:(hash['long']))
        render json: coordinate, status: 200
      else
        render json: {messages: "coordinate fucked"}
      end
    else
      render json: {messages: "Error"}, status: :unauthorized
    end
  end

end
