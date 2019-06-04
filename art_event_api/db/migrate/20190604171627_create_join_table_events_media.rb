class CreateJoinTableEventsMedia < ActiveRecord::Migration[5.2]
  def change
    create_join_table :events, :media do |t|
      # t.index [:event_id, :medium_id]
      # t.index [:medium_id, :event_id]
    end
  end
end
