class SessionsController < ApplicationController

  def create
    hash = JSON.parse(request.body.read)
    user = User.find_by_email(hash['email'])
    if user.authenticate(hash['password'])
      token = SecureRandom.hex
      session = Session.create(user_id:(user.id), auth_key:(token))
      render json: {auth_key: session.auth_key}, status: 201
    else
      render json: {messages: 'Invalid Email or Password'}, status: :unauthorized
    end
  end

  def destroy
    hash = JSON.parse(request.body.read)
    session = Session.find_by_auth_key(hash['auth_key'])
    session.destroy
  end

end
