class VenuesController < ApplicationController
  before_action :get_venue, only: [:show, :update, :destroy]
  def index
    @venues = Venue.all
    render json: @venues, include: :events, status: :ok
  end

  def show
    render json: @venue, include: :events, status: :ok
  end

  def create
    @venue = Venue.create(venue_params)
    if @venue.save
      render json: @venue, include: :events, status: :created
    else
      render json: { errors: @venue.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @venue.update(venue_params)
      render json: @venue, include: :events, status: :ok
    else
      render json: { errors: @venue.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @venue.destroy
      render json: { status: :no_content }
    else
      render json: { errors: @venue.errors }, status: :unprocessable_entity
    end
  end

  private
  def get_venue
    @venue = Venue.find(params[:id])
  end

  def venue_params
    params.require(:venue).permit(:name, :area, :address, :category, :opening_time, :closing_time)
  end

end
