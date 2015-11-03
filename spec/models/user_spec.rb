require 'spec_helper'

describe User, type: :model do

  context 'Validations' do
    it { is_expected.to have_secure_password}

    it 'requires email' do
      user = User.create
      expect(user).to have(1).error_on(:email)
    end

    it 'requires password_confirmation' do
      user = User.create
      expect(user).to have(1).error_on(:password_confirmation)
    end

    it {is_expected.to validate_uniqueness_of(:email)}

    it 'requires password of at least 5 characters' do
      user = User.create(password: '1234')
      expect(user).to have(1).error_on(:password)
      expect(user).not_to be_valid
    end

    # it 'requires name of at least 2 characters' do
    #   user = User.create(name: '1')
    #   expect(user).to have(1).error_on(:name)
    #   expect(user).not_to be_valid
    # end

  end

end
