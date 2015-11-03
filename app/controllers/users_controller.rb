class UsersController < ApplicationController
  include UsersHelper

  def create
    create_user(JSON.parse(request.body.read))
  end

  def destroy
    destroy_user(JSON.parse(request.body.read))
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
