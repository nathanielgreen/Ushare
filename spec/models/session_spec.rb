require 'spec_helper'

describe Session, type: :model do

  it { is_expected.to belong_to :user}

  it { is_expected.to have_many(:coordinates).dependent(:destroy) }

end
