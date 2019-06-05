class Venue < ApplicationRecord
  has_and_belongs_to_many :days
  has_many :events
  belongs_to :venue_owner,
              optional: true

  validates :name, :category, :address, :area, :days, :opening_time, :closing_time, presence: true

  def self.get_art_beat_data
    url = "https://www.nyartbeat.com/list/event_permanent.en.xml"
    resource = Net::HTTP.get_response(URI.parse(url)).body
    data = Hash.from_xml(resource).to_json
    result = JSON.parse(data)
  end

  def self.set_art_beat_data
    data = Venue.get_art_beat_data


    data.each do |event|
      result = event[1].first[1]

      result.each do |item|
        venue = item['Venue']
        days_open = []
        venue['DaysClosed'].each do |key, value|
          if value == '0'
            days_open.push(Day.find_by(name: key))
          end
        end
        if !Venue.find_by(name: venue['Name'])
          Venue.create(
            name: venue['Name'],
            category: venue['Type'],
            address: venue['Address'],
            area: venue['Area'],
            opening_time: venue['OpeningHour'],
            closing_time: venue['ClosingHour'],
            days: days_open
          )
        end
      end

    end

  end


end
