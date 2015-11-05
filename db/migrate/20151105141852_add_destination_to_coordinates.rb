class AddDestinationToCoordinates < ActiveRecord::Migration
  def change
    add_column :coordinates, :lat_end, :string
    add_column :coordinates, :long_end, :string
  end
end
