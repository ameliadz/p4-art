class MediaController < ApplicationController
  def index
    @media = Medium.all
    render json: @media, status: :ok
  end
end
