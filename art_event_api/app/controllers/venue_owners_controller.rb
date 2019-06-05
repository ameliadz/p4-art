class VenueOwnersController < ApplicationController
  before_action :authorize_request, except: :create

  def index
    @venue_owners = VenueOwner.all
    render json: @venue_owners, status: :ok
  end

  def show
  end

  def create
    @venue_owner = VenueOwner.create(venue_owner_params)
    if @venue_owner.save
      render json: @venue_owner, status: :created
    else
      render json: @venue_owner.errors, status: :unprocessable_entity
    end
  end

  private
  def venue_owner_params
    params.require(:venue_owner).permit(:email, :password)
  end
end
