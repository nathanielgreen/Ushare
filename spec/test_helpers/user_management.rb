module UserManagement

  def sign_up
    post '/users', {
      name: 'Mr Test',
      email: 'test@test.com',
      password: 'testtest',
      password_confirmation: 'testtest'
    }.to_json, {"CONTENT_TYPE" => 'application/json'}
  end

  def incorrect_sign_up
    post '/users', {
      name: 'Mr Test',
      email: 'test@test.com',
      password: 'incorrect',
      password_confirmation: 'testtest'
    }.to_json, {"CONTENT_TYPE" => 'application/json'}
  end

  def session_sign_in
    post '/sessions', {
      email: 'test@test.com',
      password: 'testing1',
    }.to_json, {"CONTENT_TYPE" => 'application/json'}
  end

  def session_wrong_sign_in
    post '/sessions', {
      email: 'test@test.com',
      password: 'incorrect',
    }.to_json, {"CONTENT_TYPE" => 'application/json'}
  end

end
