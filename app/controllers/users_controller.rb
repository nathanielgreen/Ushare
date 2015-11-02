class UsersController < ApplicationController
  def create
    hash = JSON.parse(request.body.read)
    p hash
    user = User.new(email:(hash['email']),name:(hash['name']))
    if user.save
      render json: user
    else
      render json: user.errors
    end
  end
end
