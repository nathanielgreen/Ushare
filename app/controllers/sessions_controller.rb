class SessionsController < ApplicationController

  def create
    hash = JSON.parse(request.body.read)
    user = User.find_by_email(hash['email'])
    if user.authenticate(hash['password'])
      token = SecureRandom.hex
      session = Session.create(user_id:(user.id), auth_key:(token))
      render json: session
    else
      render json: session.errors
    end
  end

  def destroy
    hash = JSON.parse(request.body.read)
    session = Session.find_by_auth_key(hash['auth_key'])
    if session.destroy
      'success'
    else
      'faillll'
  end
end

end
