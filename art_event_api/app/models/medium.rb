class Medium < ApplicationRecord
  has_and_belongs_to_many :events
end
