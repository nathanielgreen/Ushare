module CoordinatesHelper

  def price(coord)
    if all_coordinates?(coord)
      show_price(coord)
      price_info = JSON.parse((show_price(coord)).body)
      estimated_price = price_info['prices'][0]['estimate']
      return estimated_price
    end
  end

  def show_price(coordinate)
    request = 'https://api.uber.com/v1/estimates/price?server_token=' + ENV['UBER_API']
    final = request + '&start_latitude=' + coordinate.lat + '&start_longitude=' + coordinate.long + '&end_longitude=' + coordinate.long_end + '&end_latitude=' + coordinate.lat_end
    HTTParty.get(final)
  end

  def all_coordinates?(coord)
    x = [coord.lat, coord.long, coord.lat_end, coord.long_end]
    x.include?(nil) ? false : true
  end

end
