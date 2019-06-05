class AddNameToVenueOwners < ActiveRecord::Migration[5.2]
  def change
    add_column :venue_owners, :first_name, :string
    add_column :venue_owners, :last_name, :string
  end
end
