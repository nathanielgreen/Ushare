require 'spec_helper'

describe Coordinate, type: :model do

  it { is_expected.to belong_to :user}

end
