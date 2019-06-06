class VenueOwnersController < ApplicationController
  before_action :authorize_request, except: [:show, :create]
  # i realize that you should not be able to view an index of users but i am currently faking auth for test purposes
  before_action :get_venue_owner, only: [:show, :update, :destroy]

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
    params.require(:venue_owner).permit(:id, :email, :password, :first_name, :last_name, venues_attributes: [:id, :name, :category, :address, :area, :opening_time, :closing_time, :days => []])
  end
end
