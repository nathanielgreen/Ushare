class AddSessionIdToCoordinates < ActiveRecord::Migration
  def change
    add_reference :coordinates, :session, index: true, foreign_key: true
  end
end
