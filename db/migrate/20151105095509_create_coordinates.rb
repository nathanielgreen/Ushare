class CreateCoordinates < ActiveRecord::Migration
  def change
    create_table :coordinates do |t|
      t.string :lat
      t.string :long

      t.timestamps null: false
    end
  end
end
