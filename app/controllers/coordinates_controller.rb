class CoordinatesController < ApplicationController

  def create
    hash = JSON.parse(request.body.read)
    lat = hash['lat'].to_s
    long = hash['long'].to_s
    session = Session.find_by_auth_key(hash['auth_key'])
    if session
      coordinate = Coordinate.create(lat:(lat),long:(long),session_id:("#{session.id}"))
      render json: coordinate, status: 201
    else
      render json: {messages: "Error"}, status: :unauthorized
    end
  end

  def update
    hash = JSON.parse(request.body.read)
    if session = Session.find_by_auth_key(hash['auth_key'])
      coordinate = Coordinate.find_by_session_id("#{session.id}")
      coordinate.update(lat:(hash['lat']),long:(hash['long']))
      render json: coordinate, status: 200
    else
      render json: {messages: "Error"}, status: :unauthorized
    end
  end

  private

  def coordinates_params
    params.require(:coordinate).permit(:long, :lat, :session_id)
  end

end
