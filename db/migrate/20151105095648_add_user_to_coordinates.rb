class AddUserToCoordinates < ActiveRecord::Migration
  def change
    add_reference :coordinates, :user, index: true, foreign_key: true
  end
end
