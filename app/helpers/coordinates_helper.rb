module CoordinatesHelper

  def show_price(coordinate)
    request = 'https://api.uber.com/v1/estimates/price?server_token=' + ENV['UBER_API']
    final = request + '&start_latitude=' + coordinate.lat + '&start_longitude=' + coordinate.long + '&end_longitude=' + coordinate.long_end + '&end_latitude=' + coordinate.lat_end
    HTTParty.get(final)
  end

  def all_coordinates?(coordinate)
  end

  def
  # def seconds_to_minutes(seconds)
  #   seconds / 60
  # end
end
