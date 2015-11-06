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
      if coordinate
        format_hash(hash, coordinate)
        coordinate.update(lat:(hash['lat']),long:(hash['long']), lat_end:(hash['lat_end']), long_end:(hash['long_end']))
        render json: Coordinate.all, status: 201
      else
        render json: {messages: "coordinate not updated" }, status: :unauthorized
      end
    else
      render json: {messages: "session not found" }, status: :unauthorized
    end
  end

  def format_hash(hash, coordinate)
      hash['lat'] = coordinate.lat if hash['lat'] == nil
      hash['long'] = coordinate.long if hash['long'] == nil
      hash['lat_end'] = coordinate.lat_end if hash['lat_end'] == nil
      hash['long_end'] = coordinate.long_end if hash['long_end'] == nil
  end

end
