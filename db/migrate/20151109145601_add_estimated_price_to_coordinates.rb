class AddEstimatedPriceToCoordinates < ActiveRecord::Migration
  def change
    add_column :coordinates, :estimated_price, :string
  end
end
