class SessionsController < ApplicationController
  include SessionsHelper

  def create
    log_in(JSON.parse(request.body.read))
  end

  def destroy
    log_out(JSON.parse(request.body.read))
  end

end
