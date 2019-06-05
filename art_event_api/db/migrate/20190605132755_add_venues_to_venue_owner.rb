class AddVenuesToVenueOwner < ActiveRecord::Migration[5.2]
  def change
    add_reference :venue_owners, :venue, foreign_key: true
  end
end
