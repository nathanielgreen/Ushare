module CoordinatesHelper


  def all_coordinates?(coord)
    x = [coord.lat, coord.long, coord.lat_end, coord.long_end]
    x.include?(nil) ? false : true
  end

  private

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

  def create_coordinate(hash, session)
    hash[:session_id] = session.id
    user = User.find(session.user_id)
    hash[:user_id] = user.id
    hash[:username] = user.username
    coordinate = Coordinate.create(hash)
    if coordinate
      render json: Coordinate.all, status: 201
    else
      render json: {messages: "coordinate not created" }
    end
  end

  def update_coordinate(hash, session)
    coordinate = Coordinate.find_by_session_id("#{session.id}")
    hash.delete('auth_key')
    if coordinate.update_attributes(hash)
      coordinate.update_attribute(:estimated_price, price(coordinate))
      render json: Coordinate.all, status: 201
    else
      render json: {messages: "coordinate not updated" }, status: :unauthorized
    end
  end
end
