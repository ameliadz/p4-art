class EventsController < ApplicationController
  before_action :get_event, only: [:show, :update, :destroy]
  def index
    @events = Event.all
    render json: @events, include: [:venue, :media], status: :ok
  end

  def show
    render json: @event, include: [:venue, :media], status: :ok
  end

  def create
    @event = Event.create(event_params)
    params[:event][:media].each do |category|
      @event.media.push(Medium.find_by_category(category))
    end
    if @event.save
      render json: @event, include: [:venue, :media], status: :created
    else
      puts @event.errors
      render json: { errors: @event.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @event.update(event_params)
      @event.media = []
      params[:event][:media].each do |category|
        @event.media.push(Medium.find_by_category(category))
      end
      render json: @event, include: [:venue, :media], status: :ok
    else
      render json: { errors: @event.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    if @event.destroy
      render json: { status: :no_content }
    else
      render json: { errors: @event.errors }, status: :unprocessable_entity
    end
  end

  private
  def get_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:name, :description, :images, :price, :start_date, :end_date, :permanent, :latitude, :longitude, :venue_id, :media => [:category])
  end

end

# include: {venue: {include: :days}}
