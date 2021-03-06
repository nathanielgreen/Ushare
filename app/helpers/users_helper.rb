module UsersHelper

  def create_user(hash)
    user = User.new(email:(hash['email']),name:(hash['name']),password:(hash['password']),password_confirmation:(hash['password_confirmation']), username:(hash['username']))
    if user.save
      session = Session.create(user_id:(user.id), auth_key:(SecureRandom.hex))
      render json: {auth_key: session.auth_key, user_id: user.id, username: user.username}, status: 201
    else
      render json: user.errors, status: :unauthorized
    end
  end

  def destroy_user(hash)
    session = Session.find_by_auth_key(hash['auth_key'])
    if session
      user = User.find(session.user_id)
      user.destroy
      render json: {messages: 'User deleted'}, status: 200
    else
      render json: {messages: 'Unsuccesful delete attempt, please try again'}, status: :unauthorized
    end
  end

end
