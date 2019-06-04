class CreateVenues < ActiveRecord::Migration[5.2]
  def change
    create_table :venues do |t|
      t.string :name
      t.string :category
      t.string :address
      t.string :area
      t.string :opening_time
      t.string :closing_time

      t.timestamps
    end
  end
end
