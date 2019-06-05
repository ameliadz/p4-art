class VenueAuthenticationController < ApplicationController
  # POST /auth/login
  def login

    @venue_owner = VenueOwner.find_by(email: params[:email])
    if !@venue_owner
      render json: { error: 'no account' }, status: :not_found
    end

    if @venue_owner.authenticate(params[:password]) #authenticate method provided by Bcrypt and 'has_secure_password'
      token = JsonWebToken.encode(venue_owner_id: @venue_owner.id, email: @venue_owner.email)
      render json: { token: token }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end
end
