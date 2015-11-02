class UsersController < ApplicationController

  def create
    hash = JSON.parse(request.body.read)
    user = User.new(email:(hash['email']),name:(hash['name']),password:(hash['password']),password_confirmation:(hash['password_confirmation']))
    if user.save
      # render json: user
    else
      # render json: user.errors
    end
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
