require 'rails_helper'

describe "Users" do

  context 'post request to /users' do
    it 'creates new user' do
      sign_up
      expect(User.all.count).not_to be(0)
    end
  end

end
