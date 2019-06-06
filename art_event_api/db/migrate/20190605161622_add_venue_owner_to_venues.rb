class AddVenueOwnerToVenues < ActiveRecord::Migration[5.2]
  def change
    add_reference :venues, :venue_owner, foreign_key: true, on_delete: :cascade
  end
end
