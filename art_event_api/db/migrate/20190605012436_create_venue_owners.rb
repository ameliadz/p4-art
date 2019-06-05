class CreateVenueOwners < ActiveRecord::Migration[5.2]
  def change
    create_table :venue_owners do |t|
      t.string :email

      t.timestamps
    end
  end
end
