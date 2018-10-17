# frozen_string_literal: true

class Api::V1::PhotosController < ApiController
  def index
    photos = policy_scope(Photo)

    render json: photos.page(page), meta: { count: photos.count }
  end

  def show
    photo = Photo.find(params[:id])
    authorize(photo, :show?)

    render json: photo
  end

  def create
    authorize(Photo, :create?)
    render json: Photo.create!(create_params)
  end

  def update
    photo = Photo.find(params[:id])
    authorize(photo, :update?)
    photo.update!(attributes)

    render json: photo
  end

  def destroy
    photo = Photo.find(params[:id])
    authorize(photo, :destroy?)
    photo.destroy!

    head :no_content
  end

  private

  def create_params
    {
      image: params.require(:image),
      owner: User.find(params.require(:owner))
    }
  end
end
