class Event < ApplicationRecord
  belongs_to :venue
  has_and_belongs_to_many :media

  def self.get_art_beat_data
    url = "https://www.nyartbeat.com/list/event_permanent.en.xml"
    resource = Net::HTTP.get_response(URI.parse(url)).body
    data = Hash.from_xml(resource).to_json
    result = JSON.parse(data)
  end

  def self.set_art_beat_data
    data = Event.get_art_beat_data


    data.each do |event|
      result = event[1].first[1]

      result.each do |item|
        img_array = []
        item['Image'].each do |image|
          img_array.push(image['src'])
        end
        def self.date_test(date)
          begin
            return Date.parse(date)
          rescue ArgumentError
            return nil
          end
        end

        Event.create(
          name: item['Name'],
          description: item['Description'],
          images: img_array,
          price: item['Price'],
          start_date: self.date_test(item['DateStart']),
          end_date: self.date_test(item['DateEnd']),
          permanent: (item['PermanentEvent'] == "1"),
          latitude: item['Latitude'],
          longitude: item['Longitude'],
          venue: Venue.find_by(name: item['Venue']['Name'])
        )
      end

    end

  end

end
