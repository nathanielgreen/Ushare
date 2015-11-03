class UsersController < ApplicationController

  def create
    hash = JSON.parse(request.body.read)
    user = User.new(email:(hash['email']),name:(hash['name']),password:(hash['password']),password_confirmation:(hash['password_confirmation']))
    if user.save
      token = SecureRandom.hex
      session = Session.create(user_id:(user.id), auth_key:(token))
      render json: {user_id: user.id, session_auth_key: session.auth_key}
    else
      render json: user.errors
    end
  end

  def destroy
    hash = JSON.parse(request.body.read)
    session = Session.find_by_auth_key(hash['auth_key'])
    user = User.find(session.user_id)
    p session
    if user.destroy
      render json: {}
    else
      render json: {lol: 'owned'}
    end
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
