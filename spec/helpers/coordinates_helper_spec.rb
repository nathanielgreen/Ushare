require 'spec_helper'

describe CoordinatesHelper do

  it 'returns false if coordinate instance does not have all 4 coordinates' do
    coord = Coordinate.create(lat: 1.11, long: 2.22)
    expect(all_coordinates?(coord)).to eq false
  end

  it 'returns true if coordinate instance has all 4 coordinates' do
    coord = Coordinate.create(lat: 1.11, long: 2.22, lat_end: 3.33, long_end: 4)
    expect(all_coordinates?(coord)).to eq true
  end

end
