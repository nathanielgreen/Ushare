module UserHelper

  # def app
  #   Rails.application
  # end

  def sign_up
    post '/users', {
      name: 'Mr Test',
      email: 'test@test.com',
      password: 'testtest',
      password_confirmation: 'testtest'
    }.to_json, {"CONTENT_TYPE" => 'application/json'}
  end


end
