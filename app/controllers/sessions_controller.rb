class SessionsController < ApplicationController
  include SessionsHelper

  def create
    log_in(JSON.parse(request.body.read))
  end

  def destroy
    hash = JSON.parse(request.body.read)
    p hash
    log_out(JSON.parse(request.body.read))
  end

  def session_params
    params.require(:session).permit(:auth_key, :user_id)
  end

end
