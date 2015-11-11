class CoordinatesController < ApplicationController
  include CoordinatesHelper

  def create
    hash = JSON.parse(request.body.read)
    session = Session.find_by_auth_key(hash['auth_key'])
    hash.delete('auth_key')
    return create_coordinate(hash, session) if session
    render json: {messages: "session not found"}, status: :unauthorized
  end


  def update
    hash = JSON.parse(request.body.read)
    session = Session.find_by_auth_key(hash['auth_key'])
    return update_coordinate(hash, session) if session
    render json: {messages: "session not found" }, status: :unauthorized
  end

end
