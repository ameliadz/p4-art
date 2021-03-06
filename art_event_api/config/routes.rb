Rails.application.routes.draw do
  resources :venues, :events
  post '/auth/login', to: 'venue_authentication#login'
  resources :venue_owners
  resources :media, only: [:index]
end

# need to figure out paths for viewing venues by an owner
# search logic will be on front-end
