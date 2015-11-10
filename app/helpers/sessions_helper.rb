module SessionsHelper

  def log_in(hash)
    user = User.find_by_email(hash['email'])
    if user.authenticate(hash['password'])
      if Session.find_by_user_id(user.id)
        render json: {messages: 'User already logged in'}
      else
      session = Session.create(user_id:(user.id), auth_key:(SecureRandom.hex))
      render json: {auth_key: session.auth_key, user_id: user.id, username: user.username}, status: 201
      end
    else
      render json: {messages: 'Invalid Email or Password'}, status: :unauthorized
    end
  end

  def log_out(hash)
    session = Session.find_by_auth_key(hash['auth_key'])
    if session
      session.destroy
      render json: {messages: 'Signed out'}
    else
      render json: {messages: 'Unsuccesful sign-out'}, status: :unauthorized
    end
  end

end
