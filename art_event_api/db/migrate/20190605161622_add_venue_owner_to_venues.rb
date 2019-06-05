class AddVenueOwnerToVenues < ActiveRecord::Migration[5.2]
  def change
    add_reference :venues, :venue_owner, foreign_key: true
  end
end
