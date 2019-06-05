class VenueOwner < ApplicationRecord
  has_many :venues
  accepts_nested_attributes_for :venues, allow_destroy: true

  validates :email,
            presence: true,
            uniqueness: true,
            length: { maximum: 255 },
            format: { with: URI::MailTo::EMAIL_REGEXP, message: "only allows valid emails" }

  has_secure_password
    validates :password,
              presence: true,
              length: { minimum: 6 },
              if: -> { new_record? || !password.nil? }
end
