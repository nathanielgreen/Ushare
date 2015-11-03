require 'spec_helper'

describe Session, type: :model do

  it { is_expected.to belong_to :user}

end
