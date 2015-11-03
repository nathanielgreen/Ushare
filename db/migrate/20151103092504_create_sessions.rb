class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :auth_key

      t.timestamps null: false
    end
  end
end
