Rails.application.routes.draw do

  post 'users' => 'users#create'
  delete 'users' => 'users#destroy'
  post 'sessions' => 'sessions#create'
  post 'logout' => 'sessions#logout'
  post 'coordinates' => 'coordinates#create'
  put 'coordinates' => 'coordinates#update'
  
end
