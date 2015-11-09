module CoordinatesHelper
  def show_price(coordinates)
    request = 'https://api.uber.com/v1/estimates/time?server_token=' + ENV['UBER_API']
    final = request + '&start_latitude=' + coordinate.lat + '&start_longitude=' + coordinate.long + '&end_longitude=' + coordinate.long_end + '&end_latitude=' + coordinate_lat_end
    response = HTTParty.get(final)
  end

  def all_cordinates?(session)
    session.lat && session.long && session.long_end && session.lat_end
  end

  def seconds_to_minutes(seconds)
    seconds / 60
  end
end
