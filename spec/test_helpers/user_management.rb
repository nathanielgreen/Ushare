module UserManagement

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
