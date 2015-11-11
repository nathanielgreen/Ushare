class AddUsernameToCoordinates < ActiveRecord::Migration
  def change
    add_column :coordinates, :username, :string
  end
end
