class CreateJoinTableDaysVenues < ActiveRecord::Migration[5.2]
  def change
    create_join_table :days, :venues do |t|
      # t.index [:day_id, :venue_id]
      # t.index [:venue_id, :day_id]
    end
  end
end
