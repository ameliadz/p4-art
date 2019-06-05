class AddDaysToVenue < ActiveRecord::Migration[5.2]
  def change
    add_column :venues, :days, :string, array: true, default: []
  end
end
