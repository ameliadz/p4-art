class AddPasswordDigestToVenueOwners < ActiveRecord::Migration[5.2]
  def change
    add_column :venue_owners, :password_digest, :string
  end
end
