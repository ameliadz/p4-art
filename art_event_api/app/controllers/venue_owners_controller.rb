class VenueOwnersController < ApplicationController
  before_action :authorize_request, except: :create
  before_action :get_venue_owner, only: [:show, :create, :update, :destroy]

  def index
    @venue_owners = VenueOwner.all
    render json: @venue_owners, include: :venues, status: :ok
  end

  def show
    render json: @venue_owner, include: :venues, status: :ok
  end

  def create
    @venue_owner = VenueOwner.create(venue_owner_params)
    if @venue_owner.save
      render json: @venue_owner, include: :venues, status: :created
    else
      render json: @venue_owner.errors, status: :unprocessable_entity
    end
  end

  def update
    if @venue_owner.update(venue_owner_params)
      render json: @venue_owner, include: :venues, status: :ok
    else
      render json: { errors: @venue_owner.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @venue_owner.destroy
      render json: { status: :no_content }
    else
      render json: { errors: @venue_owner.errors }, status: :unprocessable_entity
    end
  end

  private
  def get_venue_owner
    @venue_owner = VenueOwner.find(params[:id])
  end

  def venue_owner_params
    params.require(:venue_owner).permit(:email, :password)
  end
end
